import { ComponentProps } from 'react';
import makeWebshell, {
  HandleHTMLDimensionsFeature,
  ForceResponsiveViewportFeature,
  ForceElementSizeFeature,
  useAutoheight,
} from '@formidable-webview/webshell';
import WebView from 'react-native-webview';

const Webshell = makeWebshell(
  WebView,
  new HandleHTMLDimensionsFeature(),
  new ForceResponsiveViewportFeature({ maxScale: 1 }),
  new ForceElementSizeFeature({
    target: 'body',
    heightValue: 'auto',
    widthValue: 'auto',
  }),
);

export type WebshellProps = ComponentProps<typeof Webshell>;

export default function DangerousHTML(webshellProps: WebshellProps) {
  const { autoheightWebshellProps } = useAutoheight({
    webshellProps: { ...webshellProps, scrollEnabled: false },
  });
  return <Webshell {...autoheightWebshellProps} />;
}

export const generateHtml = (content?: string) => `<!DOCTYPE html>\n
<html>
  <head>
    <title>Web View</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="https://www.noteconformes.org/_next/static/css/435702342287e41e.css"/>
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
      }
      p {
        margin-top:0;
      }
    </style>
  </head>
  <body>
    <div class="prose prose-xl font-light">
      ${content}
    </div>
  </body>
</html>`;
