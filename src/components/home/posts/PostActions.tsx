// src/components/posts/PostActions.tsx
'use client';

import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, GitFork } from 'lucide-react';
import type { Posts, Comment, ProjectStats } from '@/lib/types/posts';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}


interface PostActionsProps {
  post: Posts;
  isSaved: boolean;
  addToast: ({id, message, type}:ToastInfo) => void;
  onSave: (postId: string) => void;
}

export function PostActions({post, isSaved, addToast, onSave}: PostActionsProps) {
  
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
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLike} 
              className="p-1 hover:scale-110 transition-transform duration-200"
            >
              <Heart
                className={`h-6 w-6 transition-all duration-200 ${
                  isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-900 hover:text-gray-600'
                }`}
              />
            </button>
            <button 
              onClick={() => setShowComments(!showComments)} 
              className="p-1 hover:scale-110 transition-transform duration-200"
            >
              <MessageCircle className="h-6 w-6 hover:text-gray-600 transition-colors" />
            </button>
            <button className="p-1 hover:scale-110 transition-transform duration-200">
              <Send className="h-6 w-6 hover:text-gray-600 transition-colors" />
            </button>
          </div>
          <button 
            onClick={handleSavePost} 
            className="p-1 hover:scale-110 transition-transform duration-200"
          >
            <Bookmark
              className={`h-6 w-6 transition-all duration-200 ${
                isSaved ? 'fill-black text-black scale-110' : 'text-gray-900 hover:text-gray-600'
              }`}
            />
          </button>
        </div>

        {/* Likes */}
        <div className="font-semibold text-sm mb-2">
          {formatNumber(likes)} me gusta
        </div>

        {/* Caption con formato mejorado */}
        <div className="text-sm mb-2 whitespace-pre-line">
          <span className="font-semibold mr-2">{post.username}</span>
          {post.caption}
        </div>

        {/* Estadísticas del proyecto */}
        {post.projectStats && (
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="font-semibold">Dificultad:</span> {post.projectStats.difficulty}
              </div>
              <div>
                <span className="font-semibold">Tiempo:</span> {post.projectStats.timeRequired}
              </div>
              <div className="col-span-2">
                <span className="font-semibold">Materiales:</span> {post.projectStats.materials.join(', ')}
              </div>
            </div>
          </div>
        )}

        {/* Forks count */}
        <div className="text-gray-600 text-sm mb-2">
          <GitFork className="inline w-4 h-4 mr-1" />
          {formatNumber(post.forks)} replicaciones
        </div>

        {/* Timestamp */}
        <div className="text-gray-500 text-xs uppercase mb-3">
          {post.timestamp}
        </div>

        {/* Comments Preview */}
        {comments.length > 0 && !showComments && (
          <button
            onClick={() => setShowComments(true)}
            className="text-gray-500 text-sm mb-3 hover:text-gray-700 transition-colors"
          >
            Ver los {formatNumber(comments.length)} comentarios
          </button>
        )}

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-3 mb-3 max-h-60 overflow-y-auto">
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

        {/* Add Comment */}
        <form onSubmit={addComment} className="flex items-center border-t border-gray-200 pt-3">
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
            className={`font-semibold text-sm transition-all ${
              !commentText.trim() 
                ? 'text-blue-300 cursor-not-allowed' 
                : 'text-blue-500 hover:text-blue-600'
            }`}
          >
            Publicar
          </button>
        </form>
      </div>
  );
}