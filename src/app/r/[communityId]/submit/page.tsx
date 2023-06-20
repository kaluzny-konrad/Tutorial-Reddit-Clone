import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Posts/NewPostForm";
import NewPostHeader from "@/components/Posts/NewPostHeader";

type Props = {
  params: {
    communityId: string;
  };
};

export default function submit({ params: { communityId } }: Props) {
  return (
    <PageContent>
      <>
        <NewPostHeader />
        <NewPostForm communityId={communityId} />
      </>
      <>{/* <About /> */}</>
    </PageContent>
  );
}
