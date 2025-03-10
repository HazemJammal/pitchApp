import SearchForm from "@/components/SearchForm";
import StartUpCard, { StartUpTypeCard } from "@/components/StartUpCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUP_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = {search:query || null}
  const {data:posts} = await sanityFetch({query:STARTUP_QUERY,params})
  
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch your startup
          <br />
          Connect with enterpuners
        </h1>
        <p className="sub-heading !max-w-3xl capitalize">
          Submit Ideas, Vote on pitches and get noticed in virtual competations
        </p>
        <SearchForm query={query} />
      </section>
      <section className=" section_container ">
        <p className="text-30-semibold">
          {query ? "Search results for " + query : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartUpTypeCard) => (
              <StartUpCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}
