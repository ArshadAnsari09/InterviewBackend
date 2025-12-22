const bcrypt = require("bcrypt");

const isObjEmp = (obj) => {
    return Object.keys(obj).length > 0 ? false : true;
};

const checkHashPass = async (pass,hashPass) => {
    return await bcrypt.compare(pass,hashPass);
};

const sorting = (list, info) => {
    if (!Array.isArray(list)) return list;

    if (info?.sort_val && info?.dir) {
        const key = info.sort_val;
        const dir = Number(info.dir);

        return list.sort((a, b) => {
            if (a[key] > b[key]) return dir;
            if (a[key] < b[key]) return -dir;
            return 0;
        });
    }
    return list.sort((a, b) => {
        return b._id.toString().localeCompare(a._id.toString());
    });
};

const pagination = (info, defaultLimit = 10) => {
    if (info.all)
        return {}
    else {
        let limit = defaultLimit, skip = 0;
        if (info.limit && !isNaN(info.limit))
            limit = Number(info.limit);
        if (info.page && !isNaN(info.page))
            skip = Number(limit * info.page);
        return { limit, skip };
    }
};

const regexIncase = val => {
    let reg = new RegExp(`${val}`);
    let regObj = {
        $regex: reg,
        $options: "i"
    };
    return regObj;
}

module.exports = {
    isObjEmp,
    checkHashPass,
    sorting,
    pagination,
    regexIncase
}