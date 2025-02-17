'use client';

import React from 'react';

export default function TeamHeaderSkeleton() {
  return (
    <div className="relative mx-auto mt-[5.25rem] flex h-16 w-full max-w-[75rem] items-center justify-between rounded-xl border border-state-50/10 bg-background-secondary px-6">
      <div className="h-6 w-40 animate-pulse rounded bg-background-tertiary" />
    </div>
  );
}
