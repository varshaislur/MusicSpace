// app/api/test-data/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Create a test user
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
      },
    });

    // Create a space owned by the test user
    const space = await prisma.space.create({
      data: {
        name: 'Test Space',
        joinCode: 'TEST123',
        ownerId: user.id,
      },
    });

    // Create another user
    const anotherUser = await prisma.user.create({
      data: {
        email: 'member@example.com',
        name: 'Test Member',
      },
    });

    // Add the second user as a member of the space
    const membership = await prisma.spaceMembership.create({
      data: {
        userId: anotherUser.id,
        spaceId: space.id,
      },
    });

    // Add a song to the space
    const song = await prisma.song.create({
      data: {
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'Rick Astley - Never Gonna Give You Up',
        spaceId: space.id,
        addedById: user.id,
      },
    });

    // Add a vote for the song
    const vote = await prisma.vote.create({
      data: {
        userId: anotherUser.id,
        songId: song.id,
      },
    });

    // Return the created data
    return NextResponse.json({
      success: true,
      data: {
        user,
        space,
        anotherUser,
        membership,
        song,
        vote,
      },
    });
  } catch (error) {
    console.error('Error creating test data:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}