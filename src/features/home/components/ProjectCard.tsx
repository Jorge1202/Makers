// // components/home/ProjectCard.tsx
// import { GitFork, Heart, Clock } from 'lucide-react';
// import type { Posts } from '@/lib/types/posts';

// interface ProjectCardProps {
//   post: Posts;
// }

// export function ProjectCard({ post }: ProjectCardProps) {
//   return (
//     <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group">
//       {/* Media */}
//       <div className="relative aspect-square overflow-hidden">
//         <img 
//           src={post.media[0].url} 
//           alt={post.media[0].alt}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//         />

//         {/* Overlay con stats */}
//         <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
//           {post.media.length} {post.media.length === 1 ? 'paso' : 'pasos'}
//         </div>

//         {/* Dificultad */}
//         <div className="absolute top-2 left-2">
//           <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//             post.projectStats?.difficulty === 'Principiante' 
//               ? 'bg-green-100 text-green-800'
//               : post.projectStats?.difficulty === 'Intermedia'
//               ? 'bg-yellow-100 text-yellow-800'
//               : 'bg-red-100 text-red-800'
//           }`}>
//             {post.projectStats?.difficulty}
//           </span>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         {/* User info */}
//         <div className="flex items-center space-x-2 mb-2">
//           <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
//           <span className="text-sm font-medium text-gray-900 truncate">
//             {post.username}
//           </span>
//           {post.userBadge && (
//             <span className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded">
//               {post.userBadge}
//             </span>
//           )}
//         </div>

//         {/* Title (primer línea del caption) */}
//         <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
//           {post.title?.split('\n')[0].replace(/\*\*/g, '')}
//         </h3>

//         {/* Stats */}
//         <div className="flex items-center justify-between text-sm text-gray-500">
//           <div className="flex items-center space-x-3">
//             <div className="flex items-center space-x-1">
//               <Heart className="h-3 w-3" />
//               <span>{post.likes}</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <GitFork className="h-3 w-3" />
//               <span>{post.forks}</span>
//             </div>
//           </div>

//           <div className="flex items-center space-x-1">
//             <Clock className="h-3 w-3" />
//             <span>{post.projectStats?.timeRequired}</span>
//           </div>
//         </div>

//         {/* Tools/Materials Preview */}
//         <div className="mt-3 flex flex-wrap gap-1">
//           {post.projectStats?.tools.slice(0, 2).map((tool, index) => (
//             <span key={index} className="inline-flex items-center bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
//               {/* <Tool className="h-3 w-3 mr-1" /> */}
//               {tool}
//             </span>
//           ))}
//           {post.projectStats?.tools.length > 2 && (
//             <span className="text-xs text-gray-500">
//               +{post.projectStats.tools.length - 2} más
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import { GitFork, Heart, Clock, Star } from 'lucide-react';
import Image from 'next/image';
import type { Posts } from '@/features/home/types/posts';

interface ProjectGridCardProps {
  post: Posts;
}

export function ProjectCard({ post }: ProjectGridCardProps) {
  const getDifficultyInfo = (difficulty: string) => {
    const difficultyMap = {
      'Principiante': { color: 'bg-green-100 text-green-800', emoji: '🟢' },
      'Intermedia': { color: 'bg-yellow-100 text-yellow-800', emoji: '🟡' },
      'Avanzada': { color: 'bg-red-100 text-red-800', emoji: '🔴' }
    };
    return difficultyMap[difficulty as keyof typeof difficultyMap] || difficultyMap.Principiante;
  };

  const difficultyInfo = getDifficultyInfo(post.projectStats?.difficulty || 'Principiante');

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
      {/* Media */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={post.media[0].url}
          alt={post.media[0].alt || post.title || 'Default alt text'}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay con badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyInfo.color}`}>
            {difficultyInfo.emoji} {post.projectStats?.difficulty}
          </span>
        </div>

        {/* Dificultad */}
        <div className="absolute top-2 left-2">
          {/* Popular badge */}
          {post.forks > 20 && (
            <div className="bg-orange-500 text-white mt-2 px-2 py-1 rounded-full text-xs flex items-center gap-1">
              <Star className="h-3 w-3" />
              Popular
            </div>
          )}
        </div>

        {/* User badge */}
        {post.userBadge && (
          <div className="absolute bottom-2 left-2">
            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {post.userBadge}
            </span>
          </div>
        )}


        <div className="absolute bottom-2 right-2">
          {/* Número de pasos */}
          <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
            {post.media.length} {post.media.length === 1 ? 'paso' : 'pasos'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* User info */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex-shrink-0">
            <Image
              src={post.avatar}
              alt={post.username}
              width={24}
              height={24}
              className="rounded-full"
            />
          </div>
          <span className="text-sm font-medium text-gray-900 truncate flex-1">
            {post.username}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {post.title || post.caption.split('\n')[0].replace(/\*\*/g, '')}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
          {post.caption.split('\n').slice(1).join(' ').substring(0, 100)}
          {post.caption}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span className="font-medium">{post.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitFork className="h-4 w-4" />
              <span className="font-medium">{post.forks}</span>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span className="text-xs">{post.projectStats?.timeRequired}</span>
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}