/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      disableStaticImages: true,
      minimumCacheTTL: 0,
      domains: ['plseujaqvgdrrpqrjrkt.supabase.co'],
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'plseujaqvgdrrpqrjrkt.supabase.co',
            port: '',
            pathname: '/storage/v1/object/public/**/**',
         },
     ],
   },
 };
 
 export default nextConfig;
 