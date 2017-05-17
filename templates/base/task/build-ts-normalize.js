﻿/* eslint-env node, es6 */
/* eslint-disable no-regex-spaces */
'use strict';
const fs        = require('fs');
const path      = require('path');
const dts       = require('dts-bundle');
const tsfmt     = require('typescript-formatter');
const banner    = require('./banner');
const srcmap    = require('./srcmap');
const config    = require('../project.config.js');

const PACKAGE_NAME      = config.pkg.name;
const PACKAGE_NAMESPACE = config.lib.namespace;

const SOURCE_DIR_NAME = config.dir.src;

const D_TS_SETTING  = config.dts_bundle;
const LIBRARY_FILE  = path.join(process.cwd(), config.dir.pkg, config.lib.main + '.js');
const TYPE_DEF_FILE = path.join(process.cwd(), config.dir.pkg, config.dir.types, PACKAGE_NAME, config.lib.bundle_d_ts);

function update_srcmap_namespace(code) {
    const namespace = (() => {
        if (PACKAGE_NAMESPACE) {
            return PACKAGE_NAMESPACE + ':///' + PACKAGE_NAME + '/';
        } else {
            return PACKAGE_NAME + ':///';
        }
    })();

    let srcNode = srcmap.getNodeFromCode(code);

    return srcmap.getCodeFromNode(srcNode, (srcPath) => {
        return srcPath
            .replace('webpack:///' + SOURCE_DIR_NAME + '/', namespace)
            .replace('webpack:/webpack', 'webpack:///webpack')
            .replace('webpack:/external', 'webpack:///external/')
            .replace('webpack:///~', 'webpack:///node_modules')
        ;
    });
}

function normalize_src() {
    let src = fs.readFileSync(LIBRARY_FILE).toString();

    src = '\ufeff' + update_srcmap_namespace(src)
        .replace(/^\ufeff/gm, '')    // remove bom
        .replace(/\t/gm, '    ')
        .replace(/\r\n/gm, '\n')
    ;

    fs.writeFileSync(LIBRARY_FILE, src, 'utf8');
}

function normalize_d_ts() {
    // concat d.ts
    dts.bundle(D_TS_SETTING);

    // format d.ts
    tsfmt.processStream(TYPE_DEF_FILE, fs.createReadStream(TYPE_DEF_FILE), {
        tsfmt: tsfmt,
    })
    .then((content) => {
        let src = '\ufeff' + banner('.d.ts') + content.message
            .replace(/^\ufeff/gm, '')    // remove bom
            .replace(/\r\n/gm, '\n')
            .replace(/^\/\/ Generated by dts\-bundle[\s\S]*?\n/g, '')
            .replace(/^        \*/gm, '     *')
            .replace(/^            \*/gm, '         *')
            .replace(/^                \*/gm, '             *')
            .replace(/'/gm, '"')
        ;
        fs.writeFileSync(TYPE_DEF_FILE, src);
    })
    .catch((error) => {
        console.error(error);
    });
}

function main() {
    normalize_src();
    normalize_d_ts();
}

main();
