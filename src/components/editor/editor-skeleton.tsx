"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function EditorSkeleton() {
  return (
    <Card className="w-4xl min-h-[700px]">
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full h-full" />
      </CardContent>
    </Card>
  )
}