// // src/components/posts/variants/WipPost.tsx
// 'use client';

// import { useState } from 'react';
// import { Clock, HelpCircle } from 'lucide-react';
// import { PostHeader } from '../PostHeader';
// import { PostActions } from '../PostActions';
// import { MediaCarousel } from '../MediaCarousel';
// // import { PostFooter } from '../PostFooter';
// import type { WipPost as WipPostType } from '@/lib/types/posts';

// interface WipPostProps {
//   post: WipPostType;
// }

// export function WipPost({ post }: WipPostProps) {
//   const [showComments, setShowComments] = useState(false);

//   return (
//     <>
//       <PostHeader post={post} />
      
//       {/* WIP Badge */}
//       <div className="px-4 pb-2">
//         <div className="flex items-center space-x-2">
//           <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
//             <Clock className="h-3 w-3 mr-1" />
//             EN PROGRESO
//           </div>
//           {post.needsHelp && (
//             <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
//               <HelpCircle className="h-3 w-3 mr-1" />
//               NECESITO AYUDA
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Media Section */}
//       <MediaCarousel media={post.media} />
      
//       {/* Actions */}
//       <PostActions
//         postId={post.id}
//         initialLikes={post.likes}
//         initialIsLiked={post.isLiked}
//         initialIsSaved={post.isSaved}
//         onComment={() => setShowComments(!showComments)}
//       />
      
//       {/* Current Step */}
//       <div className="px-4 pb-3">
//         <div className="bg-gray-50 rounded-lg p-3">
//           <div className="text-sm">
//             <span className="font-semibold text-gray-700">Paso actual:</span>
//             <p className="text-gray-600 mt-1">{post.currentStep}</p>
//           </div>
//           {post.nextSteps && post.nextSteps.length > 0 && (
//             <div className="mt-2 text-xs">
//               <span className="font-semibold">Próximos pasos:</span>
//               <ul className="list-disc list-inside text-gray-600 ml-2">
//                 {post.nextSteps.map((step, index) => (
//                   <li key={index}>{step}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Caption */}
//       <div className="px-4 pb-3">
//         <div className="text-sm text-gray-900 whitespace-pre-line">
//           {post.caption}
//         </div>
//       </div>

//       {/* Footer */}
//       {/* <PostFooter
//         post={post}
//         showComments={showComments}
//         onShowCommentsChange={setShowComments}
//       /> */}
//     </>
//   );
// }