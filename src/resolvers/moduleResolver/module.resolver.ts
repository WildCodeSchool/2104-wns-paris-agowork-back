import {
    Resolver, Query, Arg, ID, Mutation,
  } from 'type-graphql';
  import ModuleInput from '../../models/courseModel/module.input';
  import { Module, ModuleModel } from '../../models/courseModel/module.schema';
  
  @Resolver(Module)
  export default class ModuleResolver {
    @Query(() => [Module])
    async getAllModules(): Promise<Module[]> {
      const modules = await ModuleModel.find().exec();
      if (!modules) throw new Error('Modules not found');
  
      return modules;
    }
  
    @Query(() => Module)
    async getOneModule(@Arg('id', () => ID) id: string): Promise<Module> {
      const module = await ModuleModel.findById(id).exec();
      if (!module) throw new Error('Module not found');
  
      return module;
    }
  
    @Mutation(() => Module)
    async createModule(@Arg('input') input: ModuleInput): Promise<Module> {
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
      if (!module) throw new Error('Module not found');
  
      return module;
    }
  
    @Mutation(() => Module)
    async deleteModule(@Arg('id', () => ID) id: string): Promise<Module> {
      const module = await ModuleModel.findByIdAndDelete(id);
      if (!module) throw new Error('module not found');
  
      return module;
    }
  }