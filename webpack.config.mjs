import packageConfig from "./package.json" with { type: 'json' };
import webpack from "webpack";
import path from "node:path";

const meta = `/**
 * @name ${packageConfig.displayName}
 * @author ${packageConfig.author}
 * @authorLink https://github.com/MoshiKoi
 * @description ${packageConfig.description}
 * @version ${packageConfig.version}
 * @source https://github.com/MoshiKoi/BetterDiscordDualTheme
 */`

export default webpack.defineConfig({
    mode: "development",
    target: "node",
    devtool: false,
    entry: "./src/DualTheme.plugin.ts",
    output: {
        filename: "DualTheme.plugin.js",
        path: path.join(import.meta.dirname, "dist"),
        libraryTarget: "commonjs2",
        libraryExport: "default",
        compareBeforeEmit: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new webpack.BannerPlugin({ raw: true, banner: meta })
    ]
});