import { GraphQLError } from "graphql";
import { conn } from "../../../config/db";
import { GlobalVars } from "../../../models/GlobalVars";
import { Sections } from "../../../models/Sections";
import { authorized } from "../../../utils/authorized";
import { errorType } from "../../../utils/errorType";
import { globalVarsType } from "../../../utils/globalVarsType";
import { recordTrailType } from "../../../utils/recordTrail";
import { Resolvers } from "../../generated";

export const globalVarResolver: Resolvers = {
  Query: {
    getGlobalVars: async (_, __, ctx) => {
      try {
        authorized(ctx);
        const repo = conn.getRepository(GlobalVars);
        const school_year = await repo.findOne({
          where: {
            identifier: globalVarsType.school_year,
          },
        });
        if (!school_year) {
          throw new GraphQLError(
            "SOMETHING WENT WRONG WITH SCHOOL YEAR FETCH",
            {
              extensions: {
                code: errorType.SERVER_ERROR,
              },
            }
          );
        }

        const audit_trail_type = Object.keys(recordTrailType);
        return {
          audit_trail_types: audit_trail_type,
          school_year: school_year.value,
        };
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },

    getSections: async (_, { yearLevel }, ctx) => {
      try {
        authorized(ctx);
        const sectionRepo = conn.getRepository(Sections);
        const sections = await sectionRepo.find({
          where: {
            year_level: yearLevel,
          },
        });
        return sections;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },

    getYearLevelSections: async (_, __, ctx) => {
      try {
        authorized(ctx);
        const globalVarsRepo = conn.getRepository(GlobalVars);
        const sectionRepo = conn.getRepository(Sections);
        // Fetch Year Levels
        const yearLevelArr = await globalVarsRepo.find({
          where: { identifier: globalVarsType.year_level },
        });
        // Get Sections
        const sections = await sectionRepo.find({
          where: { deleted_date: undefined },
        });
        // Map Section to yearLevelArray
        const mappedReturnValue = yearLevelArr.map(({ title, value, id }) => ({
          name: title,
          value: value,
          id,
          sections: sections.filter(({ year_level }) => year_level === value),
        }));
        return mappedReturnValue;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
  },
  Mutation: {
    deleteSection: async (_, { id }, ctx) => {
      try {
        authorized(ctx);
        const sectionRepo = conn.getRepository(Sections);

        const deleteSection = await sectionRepo.softDelete({ id });

        console.log(`deleteSection`, deleteSection);
        if (deleteSection.affected !== 0) {
          return "Fail";
        }
        return "Success";
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    addEditSection: async (_, { input }, ctx) => {
      try {
        authorized(ctx);
        const sectionRepo = conn.getRepository(Sections);

        // If has ID. Means edit
        if (input.id) {
          const selectedSection = await sectionRepo.findOne({
            where: {
              id: input.id,
            },
          });
          if (!selectedSection) {
            throw new GraphQLError("Invalid ID", {
              extensions: {
                code: errorType.SERVER_ERROR,
              },
            });
          }
          selectedSection.name = input.name;
          return await sectionRepo.save(selectedSection);
        } else {
          return await sectionRepo.save({
            name: input.name,
            year_level: input.year_level,
          });
        }
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
  },
};
