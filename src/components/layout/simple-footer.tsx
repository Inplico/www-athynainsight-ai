import React from "react";
import { Container } from "@/components/ui/container";

export function SimpleFooter(): React.ReactElement {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container className="py-12">
        <div className="text-center">
          <p className="text-lg font-bold text-white mb-2">
            Athyna Insight
          </p>
          <p className="text-sm text-gray-400 mb-6">
            The only building code AI you can trust for legal compliance.
          </p>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Athyna Insight Inc. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}