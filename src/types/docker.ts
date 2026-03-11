export interface Tag{
    name: string,
    full_size: number,
    digest: string
}

interface ImageTag{
    latest: Tag
};

export interface Image{
    name: string,
    namespace: string,
    pull_count: number,
    star_count: number,
    tags: ImageTag
}