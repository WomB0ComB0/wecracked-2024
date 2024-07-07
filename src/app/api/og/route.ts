import { ImageResponse } from '@vercel/og';
import { NextApiHandler } from 'next';
import type { NextRequest, NextResponse } from "next/server";

const fetchInterMedium = fetch(
  new URL('../../public/fonts/inter-medium.ttf', import.meta.url).href
).then(res => res.arrayBuffer());

const fetchInterBold = fetch(
  new URL('../../public/fonts/inter-bold.ttf', import.meta.url).href
).then(res => res.arrayBuffer());

export async function GET(req: NextRequest, res: NextResponse) {
  const InterBold = await fetchInterBold;
  const InterMedium = await fetchInterMedium;

  const { searchParams } = new URL(req.url);

  const hasTitle = searchParams.has('title');
  const title = hasTitle ? searchParams.get('title') : undefined;

  const Content = hasTitle ? (
    <BlogPostContent title={title} />
  ) : (
    <ProfileContent />
  );

  try {
    return new ImageResponse(<BackgroundCanvas>{Content}</BackgroundCanvas>, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Noto Sans',
          data: NotoSansBold,
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Noto Sans',
          data: NotoSansMedium,
          style: 'normal',
          weight: 500,
        },
      ],
    });
  } catch {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}