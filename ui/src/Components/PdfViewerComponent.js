import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
const PSPDFKit = await import("pspdfkit");
export default function PdfViewerComponent(props) {
  const containerRef = useRef(null);
  const location = useLocation();
  const { document } = props;
  useEffect(() => {
    const loadPSPDFKit = async () => {
      const container = containerRef.current;
      if (!container) return;

      try {
        // Dynamically import PSPDFKit

        // Unload any existing PSPDFKit instance
        PSPDFKit.unload(container);

        // Load PSPDFKit with the provided document
        const instance = await PSPDFKit.load({
          container,
          document: document,
          baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
        });

        // Optional: You can access the PSPDFKit instance here if needed
        console.log("PSPDFKit instance loaded:", instance);
      } catch (error) {
        console.error("Error loading PSPDFKit:", error);
      }
    };

    loadPSPDFKit();

    // Cleanup function
    return () => {
      const container = containerRef.current;
      if (container) {
        // Unload PSPDFKit when the component unmounts
        PSPDFKit.unload(container);
      }
    };
  }, [document]);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
