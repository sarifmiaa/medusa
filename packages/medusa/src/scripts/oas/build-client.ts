import path from "path"
import { generate, HttpClient, Indent } from "openapi-typescript-codegen"
import { upperFirst } from "lodash"
import { mkdir, readFile } from "fs/promises"
import logger from "../../loaders/logger"

type ApiType = "store" | "admin"

const cliParams = process.argv.slice(2)
const isVerbose = cliParams.includes("--verbose") || cliParams.includes("-V")
const debug = (...args) => {
  if (isVerbose) {
    logger.debug(...args)
  }
}

// Current package root directory
const packagePath = path.resolve(__dirname, "../../../")

const run = async () => {
  debug("Generate Client from OAS.")

  const targetPackageSrcDir = path.resolve(packagePath, "../medusa-client/src")
  await mkdir(targetPackageSrcDir, { recursive: true })

  for (const apiType of ["store", "admin"]) {
    debug(`Building Client for ${apiType} api.`)
    const oas = await getOASFromFile(apiType as ApiType)
    await generateClientSDK(oas, apiType as ApiType, targetPackageSrcDir)
  }

  debug("Client successfully generated.")
}

const getOASFromFile = async (apiType: ApiType) => {
  const jsonFile = path.resolve(packagePath, `oas/${apiType}.oas.json`)
  const jsonString = await readFile(jsonFile, "utf8")
  return JSON.parse(jsonString)
}

const generateClientSDK = async (
  oas,
  apiType: ApiType,
  targetPackageSrcDir: string
) => {
  const input = oas
  const output = path.resolve(targetPackageSrcDir, apiType)
  const httpClient = HttpClient.AXIOS
  const useOptions = true
  const useUnionTypes = true
  const exportCore = true
  const exportServices = true
  const exportModels = true
  const exportHooks = true
  const exportSchemas = true
  const indent = Indent.SPACE_2
  const postfixServices = "Service"
  const postfixModels = ""
  const clientName = `Medusa${upperFirst(apiType)}`
  const request = undefined

  await generate({
    input,
    output,
    httpClient,
    useOptions,
    useUnionTypes,
    exportCore,
    exportServices,
    exportModels,
    exportHooks,
    exportSchemas,
    indent,
    postfixServices,
    postfixModels,
    clientName,
    request,
  })
}

void (async () => {
  await run()
})()
