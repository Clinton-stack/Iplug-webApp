import { useMemo } from 'react';
import type { Project } from '@/constants/projectsData';

interface ProjectFilters {
  searchQuery?: string;
  statusFilter?: string;
  categoryFilter?: string;
  providerFilter?: string;
  dateRange?: string;
}

// Hook for filtering projects based on various criteria
export const useProjectFilters = (projects: Project[], filters: ProjectFilters) => {
  return useMemo(() => {
    let filtered = [...projects];

    // Apply search filter
    if (filters.searchQuery?.trim()) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.provider?.name.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.subcategory.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (filters.statusFilter && filters.statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === filters.statusFilter);
    }

    // Apply category filter
    if (filters.categoryFilter && filters.categoryFilter !== 'all') {
      filtered = filtered.filter(project => project.category === filters.categoryFilter);
    }

    // Apply provider filter
    if (filters.providerFilter?.trim()) {
      const providerQuery = filters.providerFilter.toLowerCase();
      filtered = filtered.filter(project =>
        project.provider?.name.toLowerCase().includes(providerQuery)
      );
    }

    // Apply date range filter
    if (filters.dateRange && filters.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.dateRange) {
        case 'last_7_days':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'last_30_days':
          filterDate.setDate(now.getDate() - 30);
          break;
        case 'last_3_months':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        case 'last_6_months':
          filterDate.setMonth(now.getMonth() - 6);
          break;
        case 'this_year':
          filterDate.setFullYear(now.getFullYear(), 0, 1);
          break;
        default:
          break;
      }
      
      filtered = filtered.filter(project => 
        new Date(project.lastActivity) >= filterDate
      );
    }

    return filtered;
  }, [projects, filters]);
};

// Hook for sorting projects
export const useProjectSorting = (projects: Project[], sortBy: string) => {
  return useMemo(() => {
    const sorted = [...projects];
    
    return sorted.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'budget_high':
          return b.totalBudget - a.totalBudget;
        case 'budget_low':
          return a.totalBudget - b.totalBudget;
        case 'deadline':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'progress':
          return b.overallProgress - a.overallProgress;
        case 'activity':
          return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
        default:
          return 0;
      }
    });
  }, [projects, sortBy]);
};

// Hook for project statistics
export const useProjectStats = (projects: Project[]) => {
  return useMemo(() => {
    const stats = {
      total: projects.length,
      draft: 0,
      open: 0,
      proposalReceived: 0,
      inProgress: 0,
      completed: 0,
      disputed: 0,
      cancelled: 0,
      totalBudget: 0,
      averageProgress: 0,
      activeProjects: 0,
      overdueMilestones: 0
    };

    projects.forEach(project => {
      // Count by status
      switch (project.status) {
        case 'Draft':
          stats.draft++;
          break;
        case 'Open':
          stats.open++;
          break;
        case 'Proposal Received':
          stats.proposalReceived++;
          break;
        case 'In Progress':
          stats.inProgress++;
          stats.activeProjects++;
          break;
        case 'Completed':
          stats.completed++;
          break;
        case 'Disputed':
          stats.disputed++;
          stats.activeProjects++;
          break;
        case 'Cancelled':
          stats.cancelled++;
          break;
      }

      // Sum total budget
      stats.totalBudget += project.totalBudget || 0;

      // Calculate average progress
      stats.averageProgress += project.overallProgress || 0;

      // Count overdue milestones
      if (project.milestones) {
        const now = new Date();
        project.milestones.forEach(milestone => {
          if (
            milestone.status !== 'Completed' && 
            milestone.dueDate && 
            new Date(milestone.dueDate) < now
          ) {
            stats.overdueMilestones++;
          }
        });
      }
    });

    // Calculate average progress
    if (stats.total > 0) {
      stats.averageProgress = Math.round(stats.averageProgress / stats.total);
    }

    return stats;
  }, [projects]);
};

// Hook for milestone statistics
export const useMilestoneStats = (projects: Project[]) => {
  return useMemo(() => {
    let totalMilestones = 0;
    let completedMilestones = 0;
    let inProgressMilestones = 0;
    let overdueMilestones = 0;
    let upcomingMilestones = 0;

    const now = new Date();
    const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    projects.forEach(project => {
      if (project.milestones) {
        project.milestones.forEach(milestone => {
          totalMilestones++;
          
          switch (milestone.status) {
            case 'Completed':
              completedMilestones++;
              break;
            case 'In Progress':
              inProgressMilestones++;
              break;
          }

          if (milestone.dueDate) {
            const dueDate = new Date(milestone.dueDate);
            
            // Count overdue
            if (milestone.status !== 'Completed' && dueDate < now) {
              overdueMilestones++;
            }
            
            // Count upcoming (due in next 7 days)
            if (milestone.status !== 'Completed' && dueDate >= now && dueDate <= in7Days) {
              upcomingMilestones++;
            }
          }
        });
      }
    });

    return {
      total: totalMilestones,
      completed: completedMilestones,
      inProgress: inProgressMilestones,
      overdue: overdueMilestones,
      upcoming: upcomingMilestones,
      completionRate: totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0
    };
  }, [projects]);
};
