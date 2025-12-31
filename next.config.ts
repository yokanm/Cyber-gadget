import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /* config options here */
 
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.apple.com' },
      { protocol: 'https', hostname: 'www.samsung.com' },
      { protocol: 'https', hostname: 'www.mi.com' },
      { protocol: 'https', hostname: 'www.oneplus.com' },
      { protocol: 'https', hostname: 'www.oppo.com' },
      { protocol: 'https', hostname: 'consumer.huawei.com' },
      { protocol: 'https', hostname: 'store.google.com' },
      { protocol: 'https', hostname: 'www.lenovo.com' },
      { protocol: 'https', hostname: 'www.dell.com' },
      { protocol: 'https', hostname: 'www.asus.com' },
      { protocol: 'https', hostname: 'www.hp.com' },
      { protocol: 'https', hostname: 'www.msi.com' },
      { protocol: 'https', hostname: 'www.amazon.com' },
      { protocol: 'https', hostname: 'www.usa.canon.com' },
      { protocol: 'https', hostname: 'www.sony.com' },
      { protocol: 'https', hostname: 'www.bose.com' },
      { protocol: 'https', hostname: 'www.playstation.com' },
      { protocol: 'https', hostname: 'www.xbox.com' },
      { protocol: 'https', hostname: 'www.nikonusa.com' },
      { protocol: 'https', hostname: 'www.sennheiser.com' },
      { protocol: 'https', hostname: 'www.nintendo.com' },
      { protocol: 'https', hostname: 'fdn2.gsmarena.com' },
      { protocol: 'https', hostname: 'fdn.gsmarena.com' },
      { protocol: 'https', hostname: 'gsmarena.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos'},
      { protocol: 'https', hostname: 'ui-avatars.com'},
    ],
    
  },
  // ESLint configuration
  
};

export default nextConfig;