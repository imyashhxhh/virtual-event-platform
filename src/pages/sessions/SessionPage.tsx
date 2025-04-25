import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  MessageSquare,
  Users,
  ThumbsUp,
  Send,
  PieChart,
  CheckCircle,
  User,
  MicOff,
  Mic,
  Video,
  VideoOff,
  MoreVertical,
  X,
  ChevronRight,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const SessionPage = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'questions' | 'polls'>('chat');
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentPoll, setCurrentPoll] = useState<any | null>(null);
  const [micEnabled, setMicEnabled] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const { user } = useAuth();
  
  // Mock data for demonstration
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate fetching session data
    setTimeout(() => {
      // Populate chat messages
      setChatMessages([
        {
          id: '1',
          content: 'Welcome everyone to the session! We\'ll be starting in a few minutes.',
          sender: {
            id: 'speaker',
            name: 'Sarah Johnson',
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            role: 'speaker'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString()
        },
        {
          id: '2',
          content: 'Looking forward to the session! This topic has been on my radar for a while.',
          sender: {
            id: 'attendee1',
            name: 'John Smith',
            avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            role: 'attendee'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString()
        },
        {
          id: '3',
          content: 'Is there going to be time for Q&A at the end?',
          sender: {
            id: 'attendee2',
            name: 'Emily Davis',
            avatar: 'https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            role: 'attendee'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString()
        },
        {
          id: '4',
          content: 'Yes, we\'ll have about 15 minutes for questions at the end. You can also use the Q&A tab to submit questions during the presentation.',
          sender: {
            id: 'speaker',
            name: 'Sarah Johnson',
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            role: 'speaker'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString()
        }
      ]);
      
      // Populate questions
      setQuestions([
        {
          id: '1',
          content: 'How will these techniques scale for enterprise applications?',
          askedBy: {
            id: 'attendee3',
            name: 'Robert Chen',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
          upvotes: 5,
          isAnswered: false
        },
        {
          id: '2',
          content: 'Can you elaborate more on the security implications of this approach?',
          askedBy: {
            id: 'attendee4',
            name: 'Lisa Wang',
            avatar: 'https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
          upvotes: 3,
          isAnswered: false
        }
      ]);
      
      // Set a current poll
      setCurrentPoll({
        id: '1',
        question: 'Which technology are you most interested in learning more about?',
        options: [
          { id: 'a', text: 'WebAssembly', votes: 12 },
          { id: 'b', text: 'Edge Computing', votes: 8 },
          { id: 'c', text: 'Serverless Architecture', votes: 15 },
          { id: 'd', text: 'AI/ML Integration', votes: 25 }
        ],
        totalVotes: 60,
        userVote: null
      });
      
      setIsLoading(false);
    }, 1500);
  }, [sessionId]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Add new message to chat
    const message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: {
        id: user?.id || 'guest',
        name: user?.name || 'Guest User',
        avatar: user?.avatar || 'https://i.pravatar.cc/150?img=5',
        role: 'attendee'
      },
      timestamp: new Date().toISOString()
    };
    
    setChatMessages([...chatMessages, message]);
    setNewMessage('');
  };
  
  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    
    // Add new question
    const question = {
      id: Date.now().toString(),
      content: newQuestion,
      askedBy: {
        id: user?.id || 'guest',
        name: user?.name || 'Guest User',
        avatar: user?.avatar || 'https://i.pravatar.cc/150?img=5'
      },
      timestamp: new Date().toISOString(),
      upvotes: 0,
      isAnswered: false
    };
    
    setQuestions([...questions, question]);
    setNewQuestion('');
  };
  
  const handleVote = (optionId: string) => {
    if (!currentPoll) return;
    
    // Update poll with user vote
    setCurrentPoll({
      ...currentPoll,
      options: currentPoll.options.map((option) => 
        option.id === optionId ? { ...option, votes: option.votes + 1 } : option
      ),
      totalVotes: currentPoll.totalVotes + 1,
      userVote: optionId
    });
  };
  
  const toggleMic = () => {
    setMicEnabled(!micEnabled);
  };
  
  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
  };
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <LoadingSpinner size="lg" color="primary" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden flex flex-col">
      {/* Session Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-bold">The Future of Web Development</h1>
            <p className="text-gray-400 text-sm">Tech Summit 2025 • Sarah Johnson</p>
          </div>
          
          <div className="mt-2 md:mt-0 flex items-center">
            <div className="bg-gray-700 rounded-full px-3 py-1 text-xs flex items-center text-gray-300 mr-4">
              <Users className="h-3 w-3 mr-1" />
              <span>256 Attendees</span>
            </div>
            
            <button 
              className="btn btn-sm btn-primary"
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
            >
              {rightPanelOpen ? (
                <>
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Hide Panel
                </>
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Show Panel
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Area */}
        <div className={`flex-1 flex flex-col ${rightPanelOpen ? 'md:mr-80' : ''}`}>
          <div className="flex-1 bg-black relative">
            {/* Main Video */}
            <img 
              src="https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Speaker" 
              className="w-full h-full object-contain"
            />
            
            {/* Participant videos */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <div className="h-32 w-44 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                {videoEnabled ? (
                  <video 
                    className="h-full w-full object-cover"
                    src="/path/to/your-video.mp4"
                    muted
                    autoPlay
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-700">
                    <User className="h-10 w-10 text-gray-500" />
                  </div>
                )}
                <div className="absolute bottom-2 left-2 text-xs font-medium bg-black/50 px-2 py-0.5 rounded">
                  You
                </div>
              </div>
            </div>
            
            {/* No video placeholder */}
            {/* <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Video className="h-20 w-20 mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-medium text-white">Waiting for the presenter</h3>
                <p className="text-gray-400">The session will start soon</p>
              </div>
            </div> */}
          </div>
          
          {/* Controls */}
          <div className="bg-gray-800 p-4 flex items-center justify-center border-t border-gray-700">
            <div className="flex space-x-4">
              <button 
                className={`p-3 rounded-full ${micEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500/20 text-red-500'}`}
                onClick={toggleMic}
                title={micEnabled ? 'Mute microphone' : 'Unmute microphone'}
              >
                {micEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </button>
              
              <button 
                className={`p-3 rounded-full ${videoEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500/20 text-red-500'}`}
                onClick={toggleVideo}
                title={videoEnabled ? 'Turn off camera' : 'Turn on camera'}
              >
                {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </button>
              
              <button 
                className="bg-red-600 hover:bg-red-700 p-3 rounded-full"
                title="Leave session"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Panel */}
        {rightPanelOpen && (
          <div className="w-full md:w-80 bg-gray-800 border-l border-gray-700 flex flex-col absolute md:relative inset-0 md:inset-auto">
            {/* Panel Header with Tabs */}
            <div className="flex border-b border-gray-700">
              <button
                className={`flex-1 py-3 text-sm font-medium ${activeTab === 'chat' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('chat')}
              >
                <div className="flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Chat
                </div>
              </button>
              
              <button
                className={`flex-1 py-3 text-sm font-medium ${activeTab === 'questions' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('questions')}
              >
                <div className="flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Q&A
                </div>
              </button>
              
              <button
                className={`flex-1 py-3 text-sm font-medium ${activeTab === 'polls' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('polls')}
              >
                <div className="flex items-center justify-center">
                  <PieChart className="h-4 w-4 mr-1" />
                  Polls
                </div>
              </button>
            </div>
            
            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === 'chat' && (
                <div className="space-y-4">
                  {chatMessages.map(message => (
                    <div key={message.id} className="flex">
                      <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={message.sender.avatar} 
                          alt={message.sender.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-2 flex-1">
                        <div className="flex items-baseline">
                          <span className={`font-medium text-sm ${message.sender.role === 'speaker' ? 'text-primary' : 'text-white'}`}>
                            {message.sender.name}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'questions' && (
                <div className="space-y-4">
                  {questions.map(question => (
                    <div key={question.id} className="bg-gray-700/50 rounded-lg p-3 relative">
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={question.askedBy.avatar} 
                            alt={question.askedBy.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-2 flex-1">
                          <div className="flex items-baseline">
                            <span className="font-medium text-sm text-white">
                              {question.askedBy.name}
                            </span>
                            <span className="ml-2 text-xs text-gray-500">
                              {formatTime(question.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 mt-1">
                            {question.content}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <button className="flex items-center text-xs text-gray-400 hover:text-white">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          Upvote ({question.upvotes})
                        </button>
                        {question.isAnswered && (
                          <span className="flex items-center text-xs text-green-500">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Answered
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'polls' && (
                <div>
                  {currentPoll ? (
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <h3 className="font-medium text-white mb-3">{currentPoll.question}</h3>
                      
                      <div className="space-y-3">
                        {currentPoll.options.map(option => {
                          const percentage = Math.round((option.votes / currentPoll.totalVotes) * 100) || 0;
                          const isVoted = currentPoll.userVote === option.id;
                          
                          return (
                            <div key={option.id} className="relative">
                              <button
                                className={`w-full text-left p-2 rounded ${
                                  isVoted 
                                    ? 'bg-primary/20 border border-primary/50' 
                                    : currentPoll.userVote 
                                      ? 'bg-gray-700 cursor-default opacity-70' 
                                      : 'bg-gray-700 hover:bg-gray-600'
                                }`}
                                onClick={() => !currentPoll.userVote && handleVote(option.id)}
                                disabled={!!currentPoll.userVote}
                              >
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">{option.text}</span>
                                  <span className="text-xs font-medium">{percentage}%</span>
                                </div>
                                
                                <div className="w-full bg-gray-800 h-1.5 mt-2 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${isVoted ? 'bg-primary' : 'bg-gray-500'}`}
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                
                                {isVoted && (
                                  <div className="absolute right-2 top-2">
                                    <CheckCircle className="h-4 w-4 text-primary" />
                                  </div>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="mt-3 text-xs text-gray-400 flex justify-between">
                        <span>{currentPoll.totalVotes} votes</span>
                        {currentPoll.userVote && (
                          <span className="text-primary">Your vote recorded</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <PieChart className="h-12 w-12 mx-auto text-gray-600 mb-3" />
                      <h3 className="text-lg font-medium text-white">No active polls</h3>
                      <p className="text-sm text-gray-400">Polls will appear here when created by the presenter</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Input Area */}
            <div className="p-3 border-t border-gray-700">
              {activeTab === 'chat' && (
                <form onSubmit={handleSendMessage} className="flex">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-700 rounded-l-md border-0 text-white placeholder-gray-400 focus:ring-primary"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="bg-primary hover:bg-primary/90 px-3 py-2 rounded-r-md"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              )}
              
              {activeTab === 'questions' && (
                <form onSubmit={handleSubmitQuestion}>
                  <textarea
                    placeholder="Ask a question..."
                    className="w-full bg-gray-700 rounded-md border-0 text-white placeholder-gray-400 focus:ring-primary resize-none"
                    rows={2}
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                  ></textarea>
                  <div className="mt-2 flex justify-end">
                    <button 
                      type="submit" 
                      className="btn btn-sm btn-primary"
                      disabled={!newQuestion.trim()}
                    >
                      Submit Question
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            {/* Mobile Close Button */}
            <div className="md:hidden border-t border-gray-700 p-2">
              <button 
                className="w-full btn btn-sm bg-gray-700 hover:bg-gray-600"
                onClick={() => setRightPanelOpen(false)}
              >
                <ChevronRight className="h-4 w-4 mr-1" />
                Hide Panel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionPage;