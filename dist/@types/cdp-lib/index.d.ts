﻿/*!
 * cdp-lib.d.ts
 * This file is generated by the CDP package build process.
 *
 * Date: 2017-04-28T03:18:33.565Z
 */
// Dependencies for this module:
//   ../fs-extra
//   ../glob
//   ../hogan.js
//   ../lodash
//   ../underscore.string
//   ../which
//   ../uuid
//   ../chalk
//   ../cli-spinner
//   ../child_process

declare module "cdp-lib" {
    import * as Utils from "cdp-lib/utils";
    export { Utils };
    /**
     * @interface IProjectConfigration
     * @brief プロジェクト共通のコンフィギュレーション設定
     */
    export interface IProjectConfigration {
        projectName: string;
        projectKind: string;
        version: string;
        license: string;
    }
    /**
     * @interface ICompileConfigration
     * @brief コンパイルコンフィギュレーション設定
     */
    export interface ICompileConfigration {
        tsTranspileTarget?: "es5" | "es2015";
        moduleSystem?: "none" | "commonjs" | "amd" | "umd";
        webpackTarget?: string;
        supportCSS?: boolean;
    }
    /**
     * @interface ILibraryConfigration
     * @brief library module プロジェクトのコンフィギュレーション設定
     */
    export interface ILibraryConfigration extends IProjectConfigration, ICompileConfigration {
        projectKind: "library";
        webpackTarget?: "node" | "web" | "electron";
    }
    /**
     * @interface IMobileAppConfigration
     * @brief mobile プロジェクトのコンフィギュレーション設定
     */
    export interface IMobileAppConfigration extends IProjectConfigration, ICompileConfigration {
        projectKind: "mobile";
        webpackTarget?: "web";
        supportCSS: true;
    }
    /**
     * @interface IDesktopAppConfigration
     * @brief mobile プロジェクトのコンフィギュレーション設定
     */
    export interface IDesktopAppConfigration extends IProjectConfigration, ICompileConfigration {
        projectKind: "desktop";
        webpackTarget?: "web" | "electron-renderer";
        supportCSS: true;
    }
    /**
     * @interface IWebAppConfigration
     * @brief web プロジェクトのコンフィギュレーション設定
     */
    export interface IWebAppConfigration extends IProjectConfigration, ICompileConfigration {
        projectKind: "web";
        webpackTarget?: "web";
        supportCSS: true;
    }
    /**
     * @class CDPLib
     * @brief CDP boilerplate 生成機能を提供するクラス
     */
    export class CDPLib {
        /**
         * main command
         */
        static execute(options: IProjectConfigration): void;
    }
}

declare module "cdp-lib/utils" {
    export * from "cdp-lib/utils/libs";
    export * from "cdp-lib/utils/tools";
}

declare module "cdp-lib/utils/libs" {
    import * as fs from "fs-extra";
    import * as glob from "glob";
    import * as hogan from "hogan.js";
    import * as _l from "lodash";
    import * as _s from "underscore.string";
    import * as which from "which";
    import * as uuid from "uuid";
    import * as chalk from "chalk";
    import { Spinner } from "cli-spinner";
    const $: JQueryStatic;
    export type MixinedUnderscoreStatic = typeof _s & typeof _l;
    const _m: MixinedUnderscoreStatic;
    export { fs, glob, hogan, $, _m as _, which, uuid, chalk, Spinner };
}

declare module "cdp-lib/utils/tools" {
    import { SpawnOptions } from "child_process";
    /**
     * Handle command line error and kill process.
     * When the application received error from cli, please call this method.
     *
     * @param {String} error  error information.
     */
    export function handleError(error: string): void;
    /**
     * Get spinner instance.
     * CLI helper.
     *
     * @param  {String}  [format]  spinner format string.
     * @param  {Number}  [index]   spinner index defined by cli-spinner. (default: random [0-9])
     * @return {Spinner} cli-spinner instance.
     */
    export function getSpinner(format?: string, index?: number): {
        start: () => void;
        stop: (clean?: boolean) => void;
    };
    /**
     * @interface NormalizeTextOptions
     * @brief normalizeText() に指定するオプション
     */
    export interface NormalizeTextOptions {
        eol?: string;
        bom?: boolean;
        tab?: number;
    }
    /**
     * Normalize text line-feed.
     * for windows git user.
     *
     * @param  {String}               text      input text.
     * @param  {NormalizeTextOptions} [options] option.
     * @return {String} normalized text.
     */
    export function normalizeText(text: string, options?: NormalizeTextOptions): string;
    /**
     * @interface ExecCommandOptions
     * @brief execCommand() に指定するオプション
     */
    export interface ExecCommandOptions extends SpawnOptions {
        spinner?: {
            format?: string;
            index?: number;
        };
    }
    /**
     * Execute command line by spawn.
     * call spawn. if error occured, cui is killed proccess.
     *
     * @param   {String}               command    main command. ex) "cordova"
     * @param   {String[]}             args       command args. ex) ["plugin", "add", pluginName]
     * @param   {ExecCommandOptions}   [options]  cli-spinner"s options.
     * @returns {Number} error code
     */
    export function execCommand(command: string, args: string[], options?: ExecCommandOptions): JQueryPromise<number>;
    /**
     * @interface CopyTemplateOptions
     * @brief copyTpl() に指定するオプション
     */
    export interface CopyTemplateOptions extends NormalizeTextOptions {
        delimiters?: "{{ }}" | "<% %>";
    }
    /**
     * Copy template with hogan.
     * sync function
     *
     * @param {String}               src       source file path.
     * @param {String}               dst       destination file path.
     * @param {Object}               params    template parameters.
     * @param {CopyTemplateOptions}  [options] options object.
     */
    export function copyTpl(src: string, dst: string, params: Object, options?: CopyTemplateOptions): void;
    /**
     * GUID generate.
     * returned as Windows registry type format.
     *
     * @return {String}
     */
    export function createGUID(): string;
    /**
     * Create XML DOM node.
     *
     * @param  {String} str  string xml format. ex) "<preference name="DisallowOverscroll" value="true"/>"
     * @return {jQuery} XML Node instance
     */
    export function str2XmlNode(str: string): JQuery;
    /**
     * @interface FormatXmlOptions
     * @brief formatXML() に指定するオプション
     */
    export interface FormatXmlOptions extends NormalizeTextOptions {
        step?: number;
    }
    /**
     * XML formatter.
     *
     * @param  {String}           str       string xml format. ex) "<preference name="DisallowOverscroll" value="true"/>"
     * @param  {FormatXmlOptions} [options] options object.
     * @return {String} formatted XML
     */
    export function formatXML(str: string, options?: FormatXmlOptions): string;
}

