import style from "./skeleton.scss";

interface SkeletonProps {
    id?: string;
}

export default function Skeleton(props: SkeletonProps) {
    return <div id={props.id} class="skeleton" />;
}
