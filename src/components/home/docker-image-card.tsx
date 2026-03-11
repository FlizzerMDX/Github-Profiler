import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { IconBrandDocker, IconBrandGithub } from "@tabler/icons-react";
import { GitPullRequest, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { useRef } from "react";
import { Image as DockerImage } from "@/types/docker";

export const DockerImageCard = ({ data, type }: { data: DockerImage, type: "Docker" | "GitHub" }) =>{
    const linkRef = useRef<HTMLAnchorElement | null>(null);
    return(
        <Card className="mx-auto w-full max-w-sm">
            {data ? 
                <>
                    <CardHeader>
                        <CardTitle className="flex gap-2 items-center">
                            {
                                type == "Docker" ?
                                    <IconBrandDocker/>
                                    :
                                    <IconBrandGithub/>
                            } 
                            {type}
                        </CardTitle>
                        <CardDescription>
                            Stats for Docker image from {type == "Docker" ? "Dockerhub" : "GitHub Registry"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <span className="flex">
                            <GitPullRequest/>
                            <span className="ml-1">
                                {data.pull_count} pulls
                            </span>
                        </span>
                        <span className="flex">
                            <Star className="hover:text-yellow-300"/>
                            <span className="ml-1">
                                {data.star_count} stars
                            </span>
                        </span>
                        <span className="flex">
                            Size : {parseFloat((data.tags?.latest?.full_size / 1000000).toFixed(2))} Mb
                        </span>
                        <span className="flex gap-1">
                            Tags :
                            <Badge variant="outline">latest</Badge>
                            <Badge variant="outline">{data.tags?.latest?.name}</Badge>
                        </span>
                    </CardContent>
                    <CardFooter>
                        <a href={`https://hub.docker.com/r/${data.namespace}/${data.name}`} target="_blank" hidden ref={linkRef}>

                        </a>
                        <Button variant="outline" size="sm" className="w-full" onClick={() => linkRef.current?.click()}>
                            Go to {type}
                        </Button>
                    </CardFooter>
                </>
            :
                <>
                    <CardHeader>
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="aspect-video w-full" />
                    </CardContent>                
                </>
      }
        </Card>
    )
};