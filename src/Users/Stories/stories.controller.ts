import { Body, Controller, Get, HttpException, Param, Patch } from '@nestjs/common';
import { StoriesService } from './Stories.service';
import { UserService } from '../Users.services';
import { CreateStoryDto } from '../dto/Story.dto';

@Controller('stories')
export class StoriesController {
  constructor(
    private storiesService: StoriesService,
    private usersService: UserService,
  ) {}

  //GET ALL STORIES
  @Get(':id/stories')
  async getUserStories(@Param('id') id: string) {
    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found3', 404);
    return findUser.stories;
  }

  //CREATE A STORY
  @Patch(':id/story')
  createStory(@Param('id') id: string, @Body() newStoryDto: CreateStoryDto) {
    return this.storiesService.createStory(id, newStoryDto);
  }

  //UPDATE SINGLE WORD IN STORY
  @Patch(':id/story/:storyId/:storyWordId')
  updateWordInStory(
    @Param('id') id: string,
    @Param('storyId') storyId: number,
    @Param('storyWordId') storyWordId: number,
    @Body() currentWord: { id: number; word: string; known: number },
  ) {
    return this.storiesService.updateWordInStory(
      id,
      storyId,
      storyWordId,
      currentWord,
    );
  }
}
