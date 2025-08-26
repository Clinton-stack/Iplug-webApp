# Access Restriction System

This document explains how to use the role-based access restriction system in the Iplug WebApp.

## Components

### AccessRestriction Component
Located at: `src/components/ui/AccessRestriction.tsx`

A reusable component that displays a professional access restriction message when users try to access pages they don't have permission for.

#### Props:
- `requiredRole`: 'Requester' | 'Provider' - The role required to access the page
- `pageName`: string - Display name of the restricted page
- `description?`: string - Custom description (optional, has defaults)
- `showRoleToggle?`: boolean - Show the role toggle button (default: true)
- `showHomeButton?`: boolean - Show the home button (default: true)

### ErrorBoundary Component
Located at: `src/components/ui/ErrorBoundary.tsx`

A React Error Boundary that catches JavaScript errors and displays a user-friendly error message instead of crashing the app.

## Pages with Role-Based Access Control

### Requester-Only Pages:
1. **Explore Services** (`/explore-services`)
   - Purpose: Browse and hire service providers
   - Accessible only to users in Requester mode

### Provider-Only Pages:
1. **My Jobs** (`/projects`)
   - Purpose: Manage active projects and client work
   - Accessible only to users in Provider mode

2. **Ads & Promotions** (`/ads-promotions`)
   - Purpose: Create and manage advertising campaigns
   - Accessible only to users in Provider mode

## How to Add Access Restriction to a New Page

1. Import the necessary components:
```tsx
import { useUserRole } from "@/contexts/UserRoleContext";
import AccessRestriction from "@/components/ui/AccessRestriction";
```

2. Add role checking at the top of your component:
```tsx
export default function YourPage() {
  const { userRole } = useUserRole();
  
  // For Provider-only pages
  if (userRole !== 'Provider') {
    return (
      <AccessRestriction
        requiredRole="Provider"
        pageName="Your Page Name"
        description="Custom description explaining why this page is restricted"
      />
    );
  }
  
  // For Requester-only pages
  if (userRole !== 'Requester') {
    return (
      <AccessRestriction
        requiredRole="Requester"
        pageName="Your Page Name"
      />
    );
  }
  
  // Your normal page content here
  return (
    <div>Your page content</div>
  );
}
```

3. Update the sidebar navigation in `src/constants/SidebarData.ts`:
```tsx
{
  label: "Your Page Name",
  href: "/your-page-route",
  icon: YourIcon,
  roles: ['Provider'] // or ['Requester'] or both ['Provider', 'Requester']
}
```

## User Experience

### For Unauthorized Users:
- Clean, professional restriction message
- Clear explanation of why access is denied
- One-click role switching button
- Option to return to dashboard
- Current role status display

### For Authorized Users:
- Normal page access
- Full functionality available

## Error Handling

### 404 Pages:
- Dashboard 404: `/src/app/(dashboard)/not-found.tsx`
- Global 404: `/src/app/not-found.tsx`

### JavaScript Errors:
- Use ErrorBoundary component to wrap sections that might fail
- Displays user-friendly error message
- Includes error details in development mode
- Provides recovery options

## Best Practices

1. Always check user roles before rendering restricted content
2. Provide clear, helpful error messages
3. Include navigation options for users to find their way
4. Update sidebar navigation to hide restricted links
5. Test both role scenarios during development
6. Use consistent messaging across all restricted pages

## Security Notes

- Role checking is done on the client-side for UX purposes
- Server-side validation should also be implemented for actual security
- Access restrictions prevent UI display but don't secure API endpoints
- Always validate permissions on the backend as well
