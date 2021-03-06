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

jarves.FieldTypes.Datetime = new Class({
    Extends: jarves.FieldAbstract,

    Statics: {
        label: 'Date & Time',
        asModel: true,
        options: {
            format: {
                type: 'text',
                label: 'Date format',
                help: 'admin/field-date-format'
            }
        }
    },

    createLayout: function () {
        this.wrapper = new Element('div', {
            'class': 'jarves-input-wrapper',
            style: this.options.style,
            styles: {
                'width': this.options.inputWidth == '100%' ? null : this.options.inputWidth,
                'height': this.options.inputHeight
            }
        }).inject(this.fieldInstance.fieldPanel);

        this.input = new Element('input', {
            'class': 'jarves-Input-text jarves-Input-date',
            styles: {
                'height': this.options.inputHeight
            },
            maxLength: this.options.maxLength
        }).inject(this.wrapper);

        this.options.time = true;
        this.datePicker = new jarves.DatePicker(this.input, this.options);

        if (this.options.inputWidth) {
            this.input.setStyle('width', this.options.inputWidth);
        }

        if (this.win) {
            this.win.addEvent('resize', this.datePicker.updatePos.bind(this.datePicker));
            this.win.addEvent('move', this.datePicker.updatePos.bind(this.datePicker));
        }

        this.datePicker.addEvent('change', this.fireChange);

        if (this.options['default']) {
            var time = new Date(this.field['default'] == 'now' ? null : this.field['default']).getTime();
            this.setValue(time, true);
        }
    },

    setValue: function (pValue) {
        this.datePicker.setTime((pValue != 0) ? pValue : false);
    },

    getValue: function () {
        return this.datePicker.getTime();
    }
});