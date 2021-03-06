/*
 * This file is part of Jarves.
 *
 * (c) Marc J. Schmidt <marc@marcjschmidt.de>
 *
 *     J.A.R.V.E.S - Just A Rather Very Easy [content management] System.
 *
 *     http://jarves.io
 *
 * To get the full copyright and license information, please view the
 * LICENSE file, that was distributed with this source code.
 */

jarves.FieldTypes.ObjectKey = new Class({

    Extends: jarves.FieldTypes.Select,

    Statics: {
        label: 'Object Key',
        asModel: true
    },

    options: {
        combobox: true
    },

    createLayout: function () {
        this.parent();

        Object.each(jarves.settings.configs, function (config, bundleName) {
            if (config.objects) {
                this.select.addSplit(config.label || bundleName);

                bundleName = jarves.getShortBundleName(bundleName);

                Object.each(config.objects, function (object, objectName) {
                    objectName = objectName.lcfirst();
                    this.select.add(
                        bundleName + '/' + objectName,
                        (object.label || objectName) + " (" + bundleName + '/' + objectName + ")"
                    );
                }.bind(this));
            }
        }.bind(this));

        if (this.select.options.selectFirst) {
            this.select.selectFirst();
        }
    },

    setValue: function(value) {
        this.parent(value ? jarves.normalizeObjectKey(value) : value);
    }
});