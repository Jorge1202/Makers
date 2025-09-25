// // src/components/posts/variants/ProjectPost.tsx
// 'use client';

// import { useState } from 'react';
// import { PostHeader } from '../PostHeader';
// import { PostActions } from '../PostActions';
// import { MediaCarousel } from '../MediaCarousel';
// import { PostFooter } from '../PostFooter';
// import type { ProjectPost as ProjectPostType } from '@/lib/types/posts';

// interface ProjectPostProps {
//   post: ProjectPostType;
// }

// export function ProjectPost({ post }: ProjectPostProps) {
//   const [showComments, setShowComments] = useState(false);

//   const handleCommentClick = () => {
//     setShowComments(!showComments);
//   };

//   return (
//     <>
//       <PostHeader post={post} />
      
//       {/* Media Section */}
//       <MediaCarousel media={post.media} />
      
//       {/* Actions */}
//       <PostActions
//         postId={post.id}
//         initialLikes={post.likes}
//         initialIsLiked={post.isLiked}
//         initialIsSaved={post.isSaved}
//         onComment={handleCommentClick}
//       />
      
//       {/* Project Metadata */}
//       <div className="px-4 pb-3">
//         <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 mb-3">
//           <div className="grid grid-cols-2 gap-3 text-sm">
//             <div>
//               <span className="font-semibold text-gray-700">Dificultad:</span>
//               <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
//                 post.difficulty === 'Principiante' ? 'bg-green-100 text-green-800' :
//                 post.difficulty === 'Intermedia' ? 'bg-yellow-100 text-yellow-800' :
//                 'bg-red-100 text-red-800'
//               }`}>
//                 {post.difficulty}
//               </span>
//             </div>
//             <div>
//               <span className="font-semibold text-gray-700">Tiempo:</span>
//               <span className="ml-1 text-gray-600">{post.timeRequired}</span>
//             </div>
//             <div className="col-span-2">
//               <span className="font-semibold text-gray-700">Materiales:</span>
//               <div className="flex flex-wrap gap-1 mt-1">
//                 {post.materials.map((material, index) => (
//                   <span key={index} className="bg-white px-2 py-1 rounded text-xs border">
//                     {material}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Caption */}
//       <div className="px-4 pb-3">
//         <div className="text-sm text-gray-900 whitespace-pre-line leading-relaxed">
//           {post.caption}
//         </div>
//       </div>

//       {/* Footer */}
//       <PostFooter
//         post={post}
//         showComments={showComments}
//         onShowCommentsChange={setShowComments}
//       />
//     </>
//   );
// }