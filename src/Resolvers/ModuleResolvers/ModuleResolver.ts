import {
    Resolver, Query, Arg, ID, Mutation,
  } from 'type-graphql';
  import ModuleInput from '../../Models/CoursModel/ModuleInput';
  import { Module, ModuleModel } from '../../Models/CoursModel/ModuleSchema';
  
  @Resolver(Module)
  export default class ModuleResolver {
    @Query(() => [Module])
    async Modules(): Promise<Module[]> {
      const modules = await ModuleModel.find().exec();
  
      return modules;
    }
  
    @Query(() => Module)
    async school(@Arg('id', () => ID) id: string): Promise<Module> {
      const module = await ModuleModel.findById(id).exec();
  
      if (!module) throw new Error('School not found');
  
      return module;
    }
  
    @Mutation(() => Module)
    async createSchool(@Arg('input') input: ModuleInput): Promise<Module> {
      const module = new ModuleModel(input);
  
      await module.save();
  
      return module;
    }
  
    @Mutation(() => Module)
    async updateModule(
      @Arg('id', () => ID) id: string,
        @Arg('input') input: ModuleInput,
    ): Promise<Module> {
      const module = await ModuleModel.findByIdAndUpdate(id, input, {
        new: true,
      });
      if (!module) throw new Error('school not found');
  
      return module;
    }
  
    @Mutation(() => Module)
    async deleteSchool(@Arg('id', () => ID) id: string): Promise<Module> {
      const module = await ModuleModel.findByIdAndDelete(id);
      if (!module) throw new Error('school not found');
  
      return module;
    }
  }