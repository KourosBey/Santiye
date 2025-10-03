type AjaxParams<T> = {
  url: string;
  data?: any;
  onSuccess?: (res: T) => void;
  onError?: (err: any) => void;
};

const baseURL = '';

export async function ajaxPost<T>({ url, data, onSuccess, onError }: AjaxParams<T>) {
  try {
    const res = await fetch(baseURL + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const json: T = await res.json();

    onSuccess?.(json);
    return json;
  } catch (err) {
    onError?.(err);
    throw err;
  }
}

export async function ajaxGet<T>({ url, onSuccess, onError }: AjaxParams<T>) {
  try {
    const res = await fetch(baseURL + url, { method: "GET" });
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const json: T = await res.json();

    onSuccess?.(json);
    return json;
  } catch (err) {
    onError?.(err);
    throw err;
  }
}