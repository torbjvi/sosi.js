(function (ns) {
    "use strict";

    var assert = assert || buster.assertions.assert;
    var refute = refute || buster.assertions.refute;

    buster.testCase('SOSIPARSERTEST', {

        setUp: function () {

            $.ajax({
                async: false,
                url: buster.env.contextPath + "/testfile1.sos",
                success:_.bind(function(data) {
                    this.sosidata = data;
                }, this)
            });
            this.parser = new ns.Parser();
        },

        "SOSI.Parser should be defined": function () {
            assert(ns.Parser);
        },

        "should read a sosi-file": function () {
            var sosidata = this.parser.parse(this.sosidata);
            assert(sosidata.hode);
            assert(sosidata.def);
            assert(sosidata.objdef);
            assert(sosidata.data);
            assert.equals(sosidata.data.length(), 8);
        },

        "should read header": function () {
            var sosidata = this.parser.parse(this.sosidata);
            assert.equals(sosidata.hode.eier, "Statens kartverk");
            assert.equals(sosidata.hode.produsent, "SØRKART A/S");
            assert.equals(sosidata.hode.objektkatalog, "Eksempel 4.5");
            assert.equals(sosidata.hode.verifiseringsdato, "19890623");
            assert.equals(sosidata.hode.version, 4.5);
            assert.equals(sosidata.hode.level, 5);
            assert.equals(sosidata.hode.vertdatum, "NN54 SJØ0");

        },

        "should get kvalitet": function () {
            var sosidata = this.parser.parse(this.sosidata);
            assert(sosidata.hode.kvalitet);
            assert.equals(sosidata.hode.kvalitet.maalemetode, 11);
            assert.equals(sosidata.hode.kvalitet.noyaktighet, 300);

        },

        "should get bounds": function () {

            var sosidata = this.parser.parse(this.sosidata);
            assert(sosidata.hode.bbox);
            assert.equals(sosidata.hode.bbox, [10000, 100000, 13200, 102400]);
        },

        "should get origo": function () {
            var sosidata = this.parser.parse(this.sosidata);
            assert(sosidata.hode.origo);
            assert.equals(sosidata.hode.origo.x, 10000);
            assert.equals(sosidata.hode.origo.y, 100000);
        },

        "should get enhet": function () {
            var sosidata = this.parser.parse(this.sosidata);
            assert.equals(sosidata.hode.enhet, 0.01);
        },

        "should get srid": function () {
            var sosidata = this.parser.parse(this.sosidata);
            assert.equals(sosidata.hode.srid, "EPSG:27395");
        }
    });

}(SOSI));