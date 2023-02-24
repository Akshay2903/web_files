// Sample data representing posts and users
const posts = [];
const users = [
  { id: 1, name: "Alice", lastActivityTime: null },
  { id: 2, name: "Bob", lastActivityTime: null },
];

// Create a post and update the user's lastActivityTime
function createPost(userId, postContent) {
  const post = { userId, content: postContent };
  posts.push(post);
  console.log(`Created post: ${JSON.stringify(post)}`);
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

// Update the user's lastActivityTime
function updateLastUserActivityTime(userId) {
  const user = users.find((u) => u.id === userId);
  console.log(`Updating lastActivityTime for user: ${user.name}`);
  user.lastActivityTime = new Date();
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

// Delete the last post created by the given user
function deleteLastPost(userId) {
  const index = posts.findIndex((p) => p.userId === userId);
  if (index !== -1) {
    const post = posts.splice(index, 1)[0];
    console.log(`Deleted post: ${JSON.stringify(post)}`);
    return Promise.resolve();
  } else {
    return Promise.reject(new Error(`No posts found for user ${userId}`));
  }
}

// Usage example
const userId = 1;

Promise.all([
  createPost(userId, "Hello world"),
  updateLastUserActivityTime(userId),
])
  .then(() => {
    console.log(`All promises resolved for user ${userId}`);
    console.log(`Posts: ${JSON.stringify(posts)}`);
    console.log(`lastActivityTime: ${users.find((u) => u.id === userId).lastActivityTime}`);

    return deleteLastPost(userId);
  })
  .then(() => {
    console.log(`Post deleted for user ${userId}`);
    console.log(`Posts: ${JSON.stringify(posts)}`);
  })
  .catch((error) => {
    console.error(error);
  });
