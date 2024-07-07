import mongoose from 'mongoose';
import User from '@/models/user';
import Post from '@/models/posts';
import Comments from '@/models/comments';
import Account from '@/models/account';
import connect from '@/utils/db';

const seed = async () => {
  try {
    await connect();

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comments.deleteMany({});
    await Account.deleteMany({});

    // Create users
    const user1 = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedpassword1', // Ensure this is a hashed password
    });

    const user2 = new User({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'hashedpassword2', // Ensure this is a hashed password
    });

    await user1.save();
    await user2.save();

    // Create posts
    const post1 = new Post({
      type: 'FEATURED',
      title: 'First Post',
      description: 'This is the first post',
      image: 'https://example.com/image1.jpg',
      userId: user1._id,
    });

    const post2 = new Post({
      type: 'LATEST',
      title: 'Second Post',
      description: 'This is the second post',
      image: 'https://example.com/image2.jpg',
      userId: user2._id,
    });

    await post1.save();
    await post2.save();

    // Create comments
    const comment1 = new Comments({
      comment: 'Great post!',
      postId: post1._id,
    });

    const comment2 = new Comments({
      comment: 'Thanks for sharing!',
      postId: post2._id,
    });

    await comment1.save();
    await comment2.save();

    // Create accounts
    const account1 = new Account({
      userId: user1._id,
      type: 'oauth',
      provider: 'google',
      providerAccountId: 'google-account-id-1',
    });

    const account2 = new Account({
      userId: user2._id,
      type: 'oauth',
      provider: 'github',
      providerAccountId: 'github-account-id-2',
    });

    await account1.save();
    await account2.save();

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
  }
};

seed().catch((err) => {
  console.error('Error seeding database:', err);
  mongoose.connection.close();
});