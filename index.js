module.exports = () => {
    const log = message => java.lang.System.out.println(`[AutoUpdate] ${message}`);
    const dir = new java.io.File("plugins/Drupi/scripts/modules");
    const modules = dir.listFiles();
    log(`Checking for updates to your installed modules...`);
    let updated = false;
    for(var i in modules){
        const module = modules[i];
        if(module.isDirectory()){
            const data = JSON.parse(manager.readFile(new java.io.File(`${module.getPath()}/package.json`)));
            if(!data.name || !data.version || !data.repository || !data.repository.url) log(`Module ${module.getName()} has an invalid package.json, and cannot be automatically updated.`);
            else {
                log(`Found module ${data.name} version ${data.version}`);
                let url = data.repository.url.replace("https://github.com/", "https://raw.githubusercontent.com/");
                try {
                    const remoteVersion = JSON.parse(http.get(`${url}/master/package.json`));
                    if(data.version == remoteVersion.version){
                        log(`${data.name} is already up to date.`);
                    } else {
                        log(`Uninstalling existing version of module ${data.name}...`);
                        (function del(directory){
                            if(directory.isDirectory()){
                                const files = directory.listFiles();
                                for(var file in files){
                                    del(files[file]);
                                }
                            }
                            directory.delete();
                        }(module));
                        log(`Updating module ${data.name}@${data.version} to version ${remoteVersion.version}...`);
                        server.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), `drupi install ${remoteVersion.name}`);
                        log(`Updated module ${data.name} to ${remoteVersion.name}@${remoteVersion.version}`);
                        updated = true;
                    }
                } catch(e){
                    log(`Failed to update module ${data.name}.`);
                }
            }
        }
    }
    if(updated){
        log(`At least 1 installed module has been updated, reloading all scripts...`);
        server.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "drupi reload");
    } else log("All modules are up to date.");
}
