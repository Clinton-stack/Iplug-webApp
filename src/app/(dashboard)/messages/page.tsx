"use client"

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Input,
  Button,
  Image,
  HStack,
  Badge,
  Stack,
} from '@chakra-ui/react';
import { 
  FiPaperclip, 
  FiMic, 
  FiMicOff, 
  FiImage, 
  FiFile, 
  FiMoreVertical,
  FiPhone,
  FiVideo,
  FiDownload,
  FiPlay,
  FiPause
} from 'react-icons/fi';
import { BsEmojiSmile } from 'react-icons/bs';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'voice';
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  isRead: boolean;
}

interface Chat {
  id: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  userType: 'provider' | 'requester';
}

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>('1');
  const [messageInput, setMessageInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data
  const [chats] = useState<Chat[]>([
    {
      id: '1',
      participantName: 'John Smith',
      participantAvatar: 'https://i.pravatar.cc/40?img=1',
      lastMessage: 'Thanks for the quick response!',
      lastMessageTime: new Date(Date.now() - 5 * 60000),
      unreadCount: 2,
      isOnline: true,
      userType: 'provider'
    },
    {
      id: '2',
      participantName: 'Jane Doe',
      participantAvatar: 'https://i.pravatar.cc/40?img=2',
      lastMessage: 'Project files attached',
      lastMessageTime: new Date(Date.now() - 30 * 60000),
      unreadCount: 0,
      isOnline: false,
      userType: 'requester'
    },
    {
      id: '3',
      participantName: 'Mike Johnson',
      participantAvatar: 'https://i.pravatar.cc/40?img=3',
      lastMessage: 'Voice message',
      lastMessageTime: new Date(Date.now() - 2 * 3600000),
      unreadCount: 1,
      isOnline: true,
      userType: 'provider'
    },
    {
      id: '4',
      participantName: 'Sarah Wilson',
      participantAvatar: 'https://i.pravatar.cc/40?img=4',
      lastMessage: 'When can we schedule a call?',
      lastMessageTime: new Date(Date.now() - 24 * 3600000),
      unreadCount: 0,
      isOnline: false,
      userType: 'requester'
    }
  ]);

  const [messages] = useState<Message[]>([
    {
      id: '1',
      senderId: '1',
      senderName: 'John Smith',
      senderAvatar: 'https://i.pravatar.cc/40?img=1',
      content: 'Hi! I saw your project request for a mobile app. I\'d love to discuss the details with you.',
      timestamp: new Date(Date.now() - 3600000),
      type: 'text',
      isRead: true
    },
    {
      id: '2',
      senderId: 'me',
      senderName: 'You',
      senderAvatar: 'https://i.pravatar.cc/40?img=14',
      content: 'Great! I\'m looking for someone experienced in React Native. Can you share some of your previous work?',
      timestamp: new Date(Date.now() - 3000000),
      type: 'text',
      isRead: true
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'John Smith',
      senderAvatar: 'https://i.pravatar.cc/40?img=1',
      content: 'Here are some screenshots from my recent projects',
      timestamp: new Date(Date.now() - 1800000),
      type: 'image',
      fileUrl: '/images/provider.png',
      isRead: true
    },
    {
      id: '4',
      senderId: '1',
      senderName: 'John Smith',
      senderAvatar: 'https://i.pravatar.cc/40?img=1',
      content: 'Voice message explaining the project approach',
      timestamp: new Date(Date.now() - 900000),
      type: 'voice',
      fileUrl: '#',
      isRead: true
    },
    {
      id: '5',
      senderId: 'me',
      senderName: 'You',
      senderAvatar: 'https://i.pravatar.cc/40?img=14',
      content: 'Thanks for the quick response!',
      timestamp: new Date(Date.now() - 300000),
      type: 'text',
      isRead: false
    }
  ]);

  const filteredChats = chats.filter(chat =>
    chat.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentChat = chats.find(chat => chat.id === selectedChat);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Here you would normally send the message via API
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('Uploading file:', file);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle image upload logic here
      console.log('Uploading image:', file);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    // Start recording logic here
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
    // Stop recording and send voice message
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  return (
    <Box h="calc(100vh - 70px)" bg="#F5F5F5">
      <Grid templateColumns={{ base: "1fr", md: "350px 1fr" }} h="full">
        {/* Chat List Sidebar */}
        <GridItem bg="white" borderRight="1px solid #E2E8F0" overflowY="auto">
          {/* Header */}
          <Box p={4} borderBottom="1px solid #E2E8F0">
            <Text fontSize="xl" fontWeight="bold" mb={3}>Messages</Text>
            <Input
              placeholder="Search conversations..."
              size="sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>

          {/* Chat List */}
          <Stack gap={0}>
            {filteredChats.map((chat) => (
              <Box
                key={chat.id}
                p={4}
                cursor="pointer"
                _hover={{ bg: "#F7FAFC" }}
                bg={selectedChat === chat.id ? "#EDF2F7" : "transparent"}
                onClick={() => setSelectedChat(chat.id)}
                borderBottom="1px solid #F7FAFC"
              >
                <HStack justify="space-between" align="start">
                  <HStack gap={3} flex="1" minW={0}>
                    <Box position="relative">
                      <Box
                        w="40px"
                        h="40px"
                        borderRadius="full"
                        bg="blue.500"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        fontSize="sm"
                        fontWeight="bold"
                      >
                        {chat.participantName.split(' ').map(n => n[0]).join('')}
                      </Box>
                      {chat.isOnline && (
                        <Box
                          position="absolute"
                          bottom="0"
                          right="0"
                          w="3"
                          h="3"
                          bg="green.400"
                          borderRadius="full"
                          border="2px solid white"
                        />
                      )}
                    </Box>
                    <Stack gap={1} flex="1" minW={0}>
                      <HStack w="full" justify="space-between">
                        <Text fontWeight="semibold" fontSize="sm" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                          {chat.participantName}
                        </Text>
                        <Badge
                          size="sm"
                          colorScheme={chat.userType === 'provider' ? 'blue' : 'green'}
                          variant="subtle"
                        >
                          {chat.userType}
                        </Badge>
                      </HStack>
                      <Text fontSize="xs" color="gray.600" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                        {chat.lastMessage}
                      </Text>
                    </Stack>
                  </HStack>
                  <Stack align="end" gap={1}>
                    <Text fontSize="xs" color="gray.500">
                      {formatTimeAgo(chat.lastMessageTime)}
                    </Text>
                    {chat.unreadCount > 0 && (
                      <Badge colorScheme="blue" borderRadius="full" size="sm">
                        {chat.unreadCount}
                      </Badge>
                    )}
                  </Stack>
                </HStack>
              </Box>
            ))}
          </Stack>
        </GridItem>

        {/* Chat Area */}
        <GridItem bg="white" display="flex" flexDirection="column">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <Flex
                p={4}
                borderBottom="1px solid #E2E8F0"
                justify="space-between"
                align="center"
                bg="white"
                position="sticky"
                top={0}
                zIndex={1}
              >
                <HStack gap={3}>
                  <Box
                    w="32px"
                    h="32px"
                    borderRadius="full"
                    bg="blue.500"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                    fontSize="xs"
                    fontWeight="bold"
                  >
                    {currentChat?.participantName?.split(' ').map(n => n[0]).join('')}
                  </Box>
                  <Stack gap={0} align="start">
                    <Text fontWeight="semibold" fontSize="sm">
                      {currentChat?.participantName}
                    </Text>
                    <HStack gap={1}>
                      <Box
                        w="2"
                        h="2"
                        borderRadius="full"
                        bg={currentChat?.isOnline ? "green.400" : "gray.400"}
                      />
                      <Text fontSize="xs" color="gray.600">
                        {currentChat?.isOnline ? 'Online' : 'Offline'}
                      </Text>
                    </HStack>
                  </Stack>
                </HStack>
                <HStack gap={2}>
                  <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="gray"
                    p={2}
                    minW="auto"
                    h="auto"
                  >
                    <FiPhone size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="gray"
                    p={2}
                    minW="auto"
                    h="auto"
                  >
                    <FiVideo size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="gray"
                    p={2}
                    minW="auto"
                    h="auto"
                  >
                    <FiMoreVertical size={16} />
                  </Button>
                </HStack>
              </Flex>

              {/* Messages Area */}
              <Box flex="1" overflowY="auto" p={4} bg="#F8FAFB">
                <Stack align="stretch" gap={4}>
                  {messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      isOwn={message.senderId === 'me'}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </Stack>
              </Box>

              {/* Recording Indicator */}
              {isRecording && (
                <Box p={3} bg="red.50" borderTop="1px solid #E2E8F0">
                  <HStack gap={3} justify="center">
                    <Box w="3" h="3" bg="red.500" borderRadius="full" />
                    <Text color="red.600" fontSize="sm" fontWeight="medium">
                      Recording... {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                    </Text>
                    <Button size="xs" colorScheme="red" onClick={stopRecording}>
                      Stop & Send
                    </Button>
                  </HStack>
                </Box>
              )}

              {/* Message Input */}
              <Box p={4} borderTop="1px solid #E2E8F0" bg="white">
                <HStack gap={3}>
                  <HStack gap={1}>
                    <Button
                      size="sm"
                      variant="ghost"
                      colorScheme="gray"
                      p={2}
                      minW="auto"
                      h="auto"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <FiPaperclip size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      colorScheme="gray"
                      p={2}
                      minW="auto"
                      h="auto"
                      onClick={() => imageInputRef.current?.click()}
                    >
                      <FiImage size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      colorScheme="gray"
                      p={2}
                      minW="auto"
                      h="auto"
                    >
                      <BsEmojiSmile size={16} />
                    </Button>
                  </HStack>
                  <Input
                    flex="1"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <HStack gap={1}>
                    <Button
                      size="sm"
                      variant="ghost"
                      colorScheme={isRecording ? "red" : "gray"}
                      p={2}
                      minW="auto"
                      h="auto"
                      onClick={isRecording ? stopRecording : startRecording}
                    >
                      {isRecording ? <FiMicOff size={16} /> : <FiMic size={16} />}
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim() && !isRecording}
                    >
                      Send
                    </Button>
                  </HStack>
                </HStack>
              </Box>
            </>
          ) : (
            // No chat selected
            <Flex flex="1" align="center" justify="center" direction="column">
              <Text fontSize="lg" color="gray.600" mb={2}>
                Select a conversation to start messaging
              </Text>
              <Text fontSize="sm" color="gray.500">
                Choose from your existing conversations or start a new one
              </Text>
            </Flex>
          )}
        </GridItem>
      </Grid>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        hidden
        onChange={handleFileUpload}
        accept=".pdf,.doc,.docx,.txt,.zip"
      />
      <input
        ref={imageInputRef}
        type="file"
        hidden
        onChange={handleImageUpload}
        accept="image/*"
      />
    </Box>
  );
};

// Message Bubble Component
interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'text':
        return <Text fontSize="sm">{message.content}</Text>;
      
      case 'image':
        return (
          <Box>
            <Text fontSize="sm" mb={2}>{message.content}</Text>
            <Image
              src={message.fileUrl}
              alt="Shared image"
              maxW="200px"
              borderRadius="md"
            />
          </Box>
        );
      
      case 'file':
        return (
          <HStack gap={3} p={3} bg="gray.50" borderRadius="md" minW="200px">
            <FiFile size={24} />
            <Stack align="start" flex="1" gap={0}>
              <Text fontSize="sm" fontWeight="medium">{message.fileName}</Text>
              <Text fontSize="xs" color="gray.600">{message.fileSize}</Text>
            </Stack>
            <Button
              size="sm"
              variant="ghost"
              p={2}
              minW="auto"
              h="auto"
            >
              <FiDownload size={16} />
            </Button>
          </HStack>
        );
      
      case 'voice':
        return (
          <HStack gap={3} p={3} bg="gray.50" borderRadius="md" minW="200px">
            <Button
              size="sm"
              colorScheme="blue"
              borderRadius="full"
              onClick={() => setIsPlaying(!isPlaying)}
              p={2}
              minW="auto"
              h="auto"
            >
              {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
            </Button>
            <Stack align="start" flex="1" gap={0}>
              <Text fontSize="sm">Voice message</Text>
              <Box w="full" h="1" bg="gray.300" borderRadius="full" position="relative">
                <Box
                  w="30%"
                  h="full"
                  bg="blue.500"
                  borderRadius="full"
                  transition="width 0.3s"
                />
              </Box>
            </Stack>
            <Text fontSize="xs" color="gray.600">0:15</Text>
          </HStack>
        );
      
      default:
        return <Text fontSize="sm">{message.content}</Text>;
    }
  };

  return (
    <HStack
      align="end"
      justify={isOwn ? "flex-end" : "flex-start"}
      gap={3}
      w="full"
    >
      {!isOwn && (
        <Box
          w="24px"
          h="24px"
          borderRadius="full"
          bg="blue.500"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          fontSize="10px"
          fontWeight="bold"
          flexShrink={0}
        >
          {message.senderName?.split(' ').map(n => n[0]).join('') || 'U'}
        </Box>
      )}
      <Stack
        align={isOwn ? "end" : "start"}
        gap={1}
        maxW="70%"
      >
        <Box
          bg={isOwn ? "blue.500" : "white"}
          color={isOwn ? "white" : "black"}
          px={4}
          py={3}
          borderRadius="lg"
          borderTopRightRadius={isOwn ? "sm" : "lg"}
          borderTopLeftRadius={isOwn ? "lg" : "sm"}
          boxShadow="sm"
        >
          {renderMessageContent()}
        </Box>
        <Text fontSize="xs" color="gray.500">
          {formatTime(message.timestamp)}
        </Text>
      </Stack>
      {isOwn && (
        <Box
          w="24px"
          h="24px"
          borderRadius="full"
          bg="blue.500"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          fontSize="10px"
          fontWeight="bold"
          flexShrink={0}
        >
          {message.senderName?.split(' ').map(n => n[0]).join('') || 'U'}
        </Box>
      )}
    </HStack>
  );
};

export default Messages;