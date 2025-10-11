import { ajaxGet } from "@/helper/ajax";

function getJobPosts({ onSuccess, onError }: { onSuccess?: (res: any) => void; onError?: (err: unknown) => void }) {
  return ajaxGet({
    url: "/data/jobPosts.json",
    onSuccess,
    onError,
  });
}

function getLastAddedJobPosts({ onSuccess, onError }: { onSuccess?: (res: any) => void; onError?: (err: unknown) => void }) {
  return ajaxGet({
    url: "/data/lastAddedJobPosts.json",
    onSuccess,
    onError,
  });
}

function getShowcaseJobPosts({ onSuccess, onError }: { onSuccess?: (res: any) => void; onError?: (err: unknown) => void }) {
  return ajaxGet({
    url: "/data/showcaseJobPosts.json",
    onSuccess,
    onError,
  });
}

function getHomeGraphsDataJobPosts({ onSuccess, onError }: { onSuccess?: (res: any) => void; onError?: (err: unknown) => void }) {
  return ajaxGet({
    url: "/data/homeGraphsData.json",
    onSuccess,
    onError,
  });
}

function getIkBlogData({ onSuccess, onError }: { onSuccess?: (res: any) => void; onError?: (err: unknown) => void }) {
  return ajaxGet({
    url: "/data/ikBlogData.json",
    onSuccess,
    onError,
  });
}

export {
  getJobPosts,
  getLastAddedJobPosts,
  getShowcaseJobPosts,
  getHomeGraphsDataJobPosts,
  getIkBlogData
};
