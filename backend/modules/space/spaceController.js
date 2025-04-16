import prisma from '../../utils/prisma.js';
import { generateRandomCode } from '../../utils/helpers.js';

export const createSpace = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId;
    
    let joinCode;
    let isUnique = false;
    while (!isUnique) {
      joinCode = generateRandomCode(6);
      const existingSpace = await prisma.space.findUnique({
        where: { joinCode }
      });
      
      if (!existingSpace) {
        isUnique = true;
      }
    }
    
    const space = await prisma.space.create({
      data: {
        name,
        joinCode,
        owner: { connect: { id: userId } },
        members: {
          create: {
            user: { connect: { id: userId } }
          }
        }
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    
    res.status(201).json(space);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSpaceDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    const space = await prisma.space.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true
          }
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        songs: {
          include: {
            addedBy: {
              select: {
                id: true,
                name: true
              }
            },
            votes: true
          },
          orderBy: {
            votes: {
              _count: 'desc'
            }
          }
        }
      }
    });
    
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }
    
    // Check if user is a member of the space
    const isMember = space.members.some(member => member.user.id === userId);
    
    if (!isMember) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(space);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const joinSpace = async (req, res) => {
  try {
    const { joinCode } = req.body;
    const userId = req.user.userId;
    
    // Find space by join code
    const space = await prisma.space.findUnique({
      where: { joinCode },
      include: {
        members: true
      }
    });
    
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }
    
    // Check if user is already a member
    const isMember = space.members.some(member => member.userId === userId);
    
    if (isMember) {
      return res.status(400).json({ message: 'Already a member of this space' });
    }
    
    // Add user to space
    const membership = await prisma.spaceMembership.create({
      data: {
        user: { connect: { id: userId } },
        space: { connect: { id: space.id } }
      },
      include: {
        space: true,
        user: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    
    res.status(201).json(membership);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMySpaces = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Get spaces where user is a member
    const memberships = await prisma.spaceMembership.findMany({
      where: { userId },
      include: {
        space: {
          include: {
            owner: {
              select: {
                id: true,
                name: true
              }
            },
            _count: {
              select: {
                members: true,
                songs: true
              }
            }
          }
        }
      }
    });
    
    const spaces = memberships.map(membership => ({
      ...membership.space,
      isOwner: membership.space.ownerId === userId,
      joinedAt: membership.joinedAt
    }));
    
    res.json(spaces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSpaceMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    // Check if space exists and user is a member
    const space = await prisma.space.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          },
          orderBy: {
            joinedAt: 'asc'
          }
        }
      }
    });
    
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }
    
    // Check if user is a member of the space
    const isMember = space.members.some(member => member.user.id === userId);
    
    if (!isMember) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const members = space.members.map(member => ({
      id: member.user.id,
      name: member.user.name,
      email: member.user.email,
      joinedAt: member.joinedAt,
      isOwner: member.user.id === space.ownerId
    }));
    
    res.json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
