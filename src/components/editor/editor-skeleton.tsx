"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function EditorSkeleton({hidden}: {hidden?: boolean}) {
  return (
    <Card className="w-4xl min-h-175" hidden={hidden}>
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