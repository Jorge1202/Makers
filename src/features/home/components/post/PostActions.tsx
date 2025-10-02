// src/components/posts/PostActions.tsx
'use client';

import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Bookmark, Share } from 'lucide-react';
import type { Posts, Comment } from '@/features/home/types/posts';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}


interface PostActionsProps {
  post: Posts;
  isSaved: boolean;
  addToast: ({ id, message, type }: ToastInfo) => void;
  onSave: (postId: string) => void;
}

export function PostActions({ post, isSaved, addToast, onSave }: PostActionsProps) {

  const [isClient, setIsClient] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);

    addToast({
      id: Math.random().toString(),
      message: isLiked ? 'Like removido' : '¡Post liked!',
      type: 'info'
    });
  };
  const handleSavePost = () => {
    onSave(post.id);
  };

  const formatNumber = (num: number): string => {
    if (!isClient) return num.toString();

    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return new Intl.NumberFormat('es-ES').format(num);
  };

  const addComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment: Comment = {
        id: Math.random().toString(),
        username: 'tu_usuario',
        text: commentText,
        timestamp: 'Ahora'
      };

      setComments(prev => [newComment, ...prev]);
      setCommentText('');

      addToast({
        id: Math.random().toString(),
        message: 'Comentario agregado',
        type: 'success'
      });
    }
  };


  return (
    <div className="p-4">
      {/* Acciónes */}
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`p-1.5 rounded-full transition-colors ${isLiked ? 'text-red-500 bg-red-50' : 'text-gray-600 hover:text-red-500'
                }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="p-1.5 text-gray-600 hover:text-blue-500 transition-colors">
              <MessageCircle className="h-5 w-5" />
            </button>
            {/* <button
              onClick={() => setShowComments(!showComments)}
              className="p-1 hover:scale-110 transition-transform duration-200"
            >
              <MessageCircle className="h-6 w-6 hover:text-gray-600 transition-colors" />
            </button> */}


          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleSavePost}
              className={`p-1.5 rounded-full transition-colors ${isSaved ? 'text-blue-500 bg-blue-50' : 'text-gray-600 hover:text-blue-500'
                }`}
            >
              <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <button className="p-1.5 text-gray-600 hover:text-gray-800 transition-colors">
              <Share className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Contadores */}
        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
          <span>{formatNumber(likes)} me gusta</span>
          <span>{comments.length} comentarios</span>
        </div>
      </div>
      {/* Comments Preview */}


      {/* Add Comment */}
      <form onSubmit={addComment} className="flex items-center border-b border-gray-200 pb-3">
        <input
          type="text"
          placeholder="Añade un comentario..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-1 border-none outline-none text-sm py-1 placeholder-gray-400 bg-transparent"
          disabled={!isClient}
        />
        <button
          type="submit"
          disabled={!commentText.trim() || !isClient}
          className={`font-semibold text-sm transition-all ${!commentText.trim()
            ? 'text-blue-300 cursor-not-allowed'
            : 'text-blue-500 hover:text-blue-600'
            }`}
        >
          Publicar
        </button>
      </form>

      {comments.length > 0 && !showComments && (
        <button
          onClick={() => setShowComments(true)}
          className="text-gray-500 text-sm mt-3 hover:text-gray-700 transition-colors"
        >
          Ver los {formatNumber(comments.length)} comentarios
        </button>
      )}

      {/* Comments Section */}
      {showComments && (
        <div className="space-y-3 mt-3 max-h-60 overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-2 group">
              <span className="font-semibold text-sm flex-shrink-0">
                {comment.username}
              </span>
              <span className="text-sm flex-1">{comment.text}</span>
              <button className="p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}


    </div>
  );
}