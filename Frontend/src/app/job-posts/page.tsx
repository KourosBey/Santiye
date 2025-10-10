import JobPosts from '@/components/jobs/JobPosts';

export default function JobListings() {
  return (
    <div className="min-h-screen max-w-[1200px]">
      {/* Header */}
      <div className="w-full flex flex-col justify-center items-center gap-4 p-4">
          <h1 className="text-3xl font-bold text-background-dark dark:text-background">İş İlanları</h1>
          <JobPosts />
      </div>
    </div>
  );
}