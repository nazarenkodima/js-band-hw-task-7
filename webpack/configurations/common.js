// Core
import getRepositoryName from 'git-repo-name';
import chalk from 'chalk';

// Paths
import { source, build } from '../paths';

// Webpack modules
import {
    loadJavaScript,
    setupHtml,
    loadFonts,
    loadImages,
    setupContextReplacement,
    setupStyledReporting,
    initializeEnvVariables
} from '../modules';

// Instruments
import merge from 'webpack-merge';

export const generateCommonConfiguration = () => {
    const BUILD_ENV = process.env.BUILD_ENV;
    const IS_DEPLOYING_TO_GITHUB_PAGES = process.env.DEPLOY_TARGET === 'github-navigation';
    let REPOSITORY_NAME = '';

    try {
        REPOSITORY_NAME = getRepositoryName.sync();
    } catch (error) {
        console.log(
            chalk.whiteBright.bgMagentaBright.bold(`Initialize git repository and/or add remote repository to deploy project to Github pages`)
        );
    }

    return merge(
        // Loaders
        loadJavaScript(),
        loadFonts(),
        loadImages(),

        // Plugins
        setupHtml(),
        setupContextReplacement(),
        setupStyledReporting(),
        initializeEnvVariables({
            __ENV__:  JSON.stringify(BUILD_ENV),
            __DEV__:  BUILD_ENV === 'development',
            __PROD__: BUILD_ENV === 'production',
        }),
        {
            entry: {
                source,
            },
            output: {
                path:       build,
                publicPath: BUILD_ENV === 'development' ? '/' : './',
            },
            resolve: {
                extensions: ['.mjs', '.js', '.json', '.css', '.m.css', '.png', '.jpg'],
                modules:    [source, 'node_modules'],
                alias: { 'react-dom': '@hot-loader/react-dom'  }
            },
            optimization: {
                nodeEnv: process.env.NODE_ENV,
            },
        }
    );
};
