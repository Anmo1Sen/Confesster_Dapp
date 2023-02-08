import { ColorModeScript } from "@chakra-ui/react";
import { Html, Head, Main, NextScript } from "next/document";
import { theme } from "@chakra-ui/react";

const Document =()=> {
    return (
        <Html lang="en">
          <Head>
              <script async data-name="BMC-Widget" 
              data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" 
              data-id="anmolsen" data-description="Support me on Buy me a coffee!" 
              data-message="Thanks for the visit you can buy me a coffee." 
              data-color="#5F7FFF" data-position="Right" 
              data-x_margin="18" data-y_margin="18"></script>
          </Head>
          <body>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Main />
            <NextScript />
          </body>
        </Html>
      );
    }

export default  Document;