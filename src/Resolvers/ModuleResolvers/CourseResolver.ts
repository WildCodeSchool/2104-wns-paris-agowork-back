import {
    Resolver, Query, Arg, ID, Mutation,
  } from 'type-graphql';
  import CourseInput from '../../Models/CoursModel/CourseInput';
  import { Course, CourseModel } from '../../Models/CoursModel/CourseSchema';
  
  @Resolver(Course)
  export default class CourseResolver {
    @Query(() => [Course])
    async Courses(): Promise<Course[]> {
      const courses = await CourseModel.find().exec();
  
      return courses;
    }
  
    @Query(() => Course)
    async course(@Arg('id', () => ID) id: string): Promise<Course> {
      const course = await CourseModel.findById(id).exec();
  
      if (!course) throw new Error('School not found');
  
      return course;
    }
  
    @Mutation(() => Course)
    async createSchool(@Arg('input') input: CourseInput): Promise<Course> {
      const course = new CourseModel(input);
  
      await course.save();
  
      return course;
    }
  
    @Mutation(() => Course)
    async updateModule(
      @Arg('id', () => ID) id: string,
        @Arg('input') input: CourseInput,
    ): Promise<Course> {
      const course = await CourseModel.findByIdAndUpdate(id, input, {
        new: true,
      });
      if (!course) throw new Error('school not found');
  
      return course;
    }
  
    @Mutation(() => Course)
    async deleteSchool(@Arg('id', () => ID) id: string): Promise<Course> {
      const course = await CourseModel.findByIdAndDelete(id);
      if (!course) throw new Error('school not found');
  
      return course;
    }
  }