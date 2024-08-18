// pages/questions/index.tsx
"use client"
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PopoverDemo } from './questionpop';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';

type Question = {
  id: string;
  createdAt: string;
  title: string;
  content: string;
  category: string;
  email: string;
  userName: string;
  profileImg: string;
};

type Reply = {
  id: string;
  createdAt: string;
  content: string;
  questionId: string;
  email: string;
  userName: string;
  profileImg: string;
};

type QuestionListProps = {
  refreshKey: number;
};

const QuestionList: React.FC<QuestionListProps> = ({ refreshKey }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [replies, setReplies] = useState<{ [key: string]: Reply[] }>({});
  const [replyContent, setReplyContent] = useState<string>("");
  const [showReplyInput, setShowReplyInput] = useState<string | null>(null); // State to manage showing reply input
  const [showReplies, setShowReplies] = useState<{ [key: string]: boolean }>(
    {}
  ); // State to manage showing/hiding replies
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const { user } = useUser();

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true); 
      const res = await fetch("/api/questions");
      const data = await res.json();
      setQuestions(data.questions);
      setLoading(false); 
    };

    fetchQuestions();
  }, [refreshKey]); // Add refreshKey to dependencies

  const fetchReplies = async (questionId: string) => {
    const res = await fetch(`/api/questions/${questionId}/replies`);
    const data = await res.json();
    setReplies((prev) => ({ ...prev, [questionId]: data.replies }));
  };

  const handleReply = async (questionId: string) => {
    if (user) {
      const res = await fetch(`/api/questions/${questionId}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: replyContent,
          email: user.emailAddresses[0]?.emailAddress || "default@example.com",
          userName: user.fullName || "defaultUser",
          profileImg: user.imageUrl || "defaultProfileImageUrl",
        }),
      });
      if (res.ok) {
        setReplyContent("");
        fetchReplies(questionId);
        setShowReplyInput(null); // Close the reply input after successful reply
      }
    } else {
      toast.error("You need to be logged in to reply.");
    }
  };

  const toggleReplies = (questionId: string) => {
    setShowReplies((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
    if (!replies[questionId]) {
      fetchReplies(questionId);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (user) {
      const res = await fetch(`/api/questions/${questionId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast.success('Question deleted successfully');
        setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== questionId));
      } else {
        toast.error('Failed to delete question');
      }
    } else {
      toast.error('You need to be logged in to delete a question');
    }
  };

  const handleDeleteReply = async (questionId: string, replyId: string) => {
    if (user) {
      const res = await fetch(`/api/questions/${questionId}/replies/${replyId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast.success('Reply deleted successfully');
        setReplies((prevReplies) => ({
          ...prevReplies,
          [questionId]: prevReplies[questionId].filter((r) => r.id !== replyId),
        }));
      } else {
        toast.error('Failed to delete reply');
      }
    } else {
      toast.error('You need to be logged in to delete a reply');
    }
  };

  const isQuestionOwner = (question: Question) => {
    return user && question.email === user.emailAddresses[0]?.emailAddress;
  };

  const isReplyOwner = (reply: Reply) => {
    return user && reply.email === user.emailAddresses[0]?.emailAddress;
  };

  return (
<div className="space-y-4">
  {loading ? (
    <div>
      <div className="flex justify-center items-center h-screen">
    <div className="relative inline-flex">
        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
        <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
    </div>
</div>
    </div> // Loading indicator
  ) : (
    questions.map((question) => (
      <div key={question.id} className="p-4 border rounded-md shadow-md bg-slate-50">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold uppercase">{question.title}</h2>
          {isQuestionOwner(question) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <MoreVertical className="h-3.5 w-3.5" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleDeleteQuestion(question.id)}>
                  Delete Question
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <p className="text-lg font-semibold text-gray-600 mt-3">{question.content}</p>
        <div className="flex items-center mt-3">
          <img
            src={question.profileImg}
            alt="User Profile"
            className="w-8 h-8 rounded-full mr-2"
          />
          <div className="flex gap-2 items-center justify-between">
            <p className="text-sm font-semibold">{question.userName}</p>
            <p className="text-sm text-blue-500">{question.email}</p>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <Button
              className="text-blue-500 bg-slate-200 hover:underline hover:bg-slate-300"
              onClick={() =>
                setShowReplyInput(
                  showReplyInput === question.id ? null : question.id
                )
              }
            >
              {showReplyInput === question.id ? "Hide Reply" : "Reply"}
            </Button>
            <Button
              className="text-blue-500 bg-slate-200 hover:underline hover:bg-slate-300 ml-2"
              onClick={() => toggleReplies(question.id)}
            >
              {showReplies[question.id] ? "Hide Replies" : "Show Replies"}
            </Button>
          </div>
          <p className="text-md font-mono font-semibold text-gray-700">
            {new Date(question.createdAt).toLocaleDateString()}
          </p>
        </div>

        {showReplyInput === question.id && (
          <div className="mt-4">
            <textarea
              className="w-full p-2 border rounded-md"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Type your reply here..."
            />
            <Button className="mt-2 " onClick={() => handleReply(question.id)}>
              Submit Reply
            </Button>
          </div>
        )}
        {showReplies[question.id] && replies[question.id] && (
          <div className="mt-4 space-y-4">
            {replies[question.id].map((reply) => (
              <div key={reply.id} className="p-2 border rounded-md">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold">{reply.userName}</h4>
                  {isReplyOwner(reply) && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="outline" className="h-8 w-8">
                          <MoreVertical className="h-3.5 w-3.5" />
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleDeleteReply(question.id, reply.id)}>
                          Delete Reply
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                <p className="text-gray-700 font-serif text-justify">{reply.content}</p>
                <div className="flex items-center mt-2">
                  <img
                    src={reply.profileImg}
                    alt="User Profile"
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <p className="text-sm text-blue-500">{reply.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ))
  )}
</div>

  );
};

const QuestionPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleQuestionSubmitted = () => {
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <div>
      <PopoverDemo onQuestionSubmitted={handleQuestionSubmitted} />
      <QuestionList refreshKey={refreshKey} />
    </div>
  );
};

export default QuestionPage;

