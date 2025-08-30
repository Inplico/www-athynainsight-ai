import { Container } from "@/components/ui/container";
import React from "react";

export function SimpleHero(): React.ReactNode {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-orange-50 to-white">
      {/* Background pattern */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-orange-400 to-amber-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <Container className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-1.5 text-sm font-medium text-orange-800">
              Coming Soon to Alberta
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600 pb-2 leading-tight">
            Building Code Confusion? Solved Instantly!
          </h1>
          
          <p className="mt-6 text-xl leading-8 text-gray-700 max-w-3xl mx-auto">
            Fast, accurate and expert-validated. Enter an Alberta address. Get the Bylaw and Code answers you need - in real-time, without the guesswork.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-orange-600">80%</div>
              <div className="text-sm text-gray-600">Time Saved on Compliance</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-orange-600">95%+</div>
              <div className="text-sm text-gray-600">Expert Validated</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-orange-600">3</div>
              <div className="text-sm text-gray-600">Regulatory Frameworks</div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}