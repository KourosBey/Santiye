import { ajaxGet, ajaxPost } from "@/helper/ajax";
import { RegisterPost } from "@/types/registerPost";

interface AjaxResponse {
  data: unknown;
}

function getJobPosts({ onSuccess, onError }: { onSuccess?: (res: AjaxResponse) => void; onError?: (err: unknown) => void }) {
  return ajaxGet({
    url: "/data/jobPosts.json",
    onSuccess,
    onError,
  });
}

function getLastAddedJobPosts({ onSuccess, onError }: { onSuccess?: (res: AjaxResponse) => void; onError?: (err: unknown) => void }) {
  return ajaxGet({
    url: "/data/lastAddedJobPosts.json",
    onSuccess,
    onError,
  });
}

function getShowcaseJobPosts({ onSuccess, onError }: { onSuccess?: (res: AjaxResponse) => void; onError?: (err: unknown) => void }) {
  return ajaxGet({
    url: "/data/showcaseJobPosts.json",
    onSuccess,
    onError,
  });
}

function getHomeGraphsDataJobPosts({ onSuccess, onError }: { onSuccess?: (res: AjaxResponse) => void; onError?: (err: unknown) => void }) {
  return ajaxGet({
    url: "/data/homeGraphsData.json",
    onSuccess,
    onError,
  });
}

function getIkBlogData({ onSuccess, onError }: { onSuccess?: (res: AjaxResponse) => void; onError?: (err: unknown) => void }) {
  return ajaxGet({
    url: "/data/ikBlogData.json",
    onSuccess,
    onError,
  });
}

function getAnnouncement({ onSuccess, onError }: { onSuccess?: (res: AjaxResponse) => void; onError?: (err: unknown) => void }) {
  return ajaxGet({
    url: "/data/announcement.json",
    onSuccess,
    onError,
  });
}

function getCvData({ onSuccess, onError }: { onSuccess?: (res: AjaxResponse) => void; onError?: (err: unknown) => void }) {
  return ajaxGet({
    url: "/data/cvData.json",
    onSuccess,
    onError,
  });
}

function postRegister({ data, onSuccess, onError }: { data: RegisterPost; onSuccess?: (res: unknown) => void; onError?: (err: unknown) => void }) {
  return ajaxPost({
    url: "https://localhost:44374/register/user",
    data,
    onSuccess,
    onError,
  });
}

export {
  getJobPosts,
  getLastAddedJobPosts,
  getShowcaseJobPosts,
  getHomeGraphsDataJobPosts,
  getIkBlogData,
  getAnnouncement,
  getCvData,
  postRegister
};
