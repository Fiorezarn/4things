const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getAllReview() {
  try {
    const res = await fetch(`${BASE_URL}/product`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
}

export async function getTrendingReview() {
  const res = await fetch(`${BASE_URL}/product/trending`);
  const data = await res.json();
  return data;
}

export async function getReviewByUser(id) {
  const res = await fetch(`${BASE_URL}/product/user/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }
  const data = await res.json();
  return data;
}

async function getComments() {
  try {
    const res = await fetch(`${BASE_URL}/review/${review.product_id}`);
    const data = await res.json();
    setComment(data.data);
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}
