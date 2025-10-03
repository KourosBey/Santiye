import { ajaxGet } from "@/helper/ajax";
import { JobPosting } from "@/types/jobPosting";

export function getJobPosts({ onSuccess, onError }: { onSuccess?: (res: any) => void; onError?: (err: any) => void }) {
  return ajaxGet<JobPosting>({
    url: "/data/jobPosts.json",
    onSuccess,
    onError,
  });
}
