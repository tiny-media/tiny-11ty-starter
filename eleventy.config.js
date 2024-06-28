import pluginWebc from "@11ty/eleventy-plugin-webc";
import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";


export default function(eleventyConfig) {

	eleventyConfig.addPlugin(pluginWebc, {
		components: [
			"./11ty/11ty_components/**/*.webc"
		]
	});

	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	// Determine if the current environment is production or development
	const isProduction = process.env.ELEVENTY_RUN_MODE === "build";
	const isDevelopment = process.env.ELEVENTY_RUN_MODE === "serve";

	// Set passthrough copy behavior. "copy" or "passthrough"
	eleventyConfig.setServerPassthroughCopyBehavior("copy");

	// DevServer Options
	eleventyConfig.setServerOptions({
		port: 8080,
        domDiff: false
	});

	// Always passthrough rootFolder to the root of the output directory
	eleventyConfig.addPassthroughCopy({ "11ty/rootFolder": "/" });

	// BuildMode Scripts
	if (isProduction) {
		eleventyConfig.addPassthroughCopy({ "11ty/css": "/css" });
	}

	// DevMode Scripts
	if (isDevelopment) {
		
		eleventyConfig.addPassthroughCopy({ "11ty/css": "/css" });
	}

	return {
		dir: {
			input: "pages", // Source files directory
			output: "_site", // Output directory
			includes: "../11ty/11ty_includes", // Includes directory (relative to input)
			layouts: "../11ty/11ty_layouts", // Layouts directory (relative to input)
			data: "../11ty/11ty_data", // Data directory (relative to input)
		},
		templateFormats: ["html", "webc", "md"], // Supported template formats
	};
}
