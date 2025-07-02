using MyApp.ServiceModel;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Text;

namespace MyApp.Tests;

public class NodeComfyConverterTests
{
    [Test]
    public void Can_deserialize_Api_Prompt()
    {
        var json = """
                   {
                     "7": {
                       inputs: {
                         text: " A rainbow is a meteorological phenomenon that is caused by reflection, refraction, and dispersion of light in water droplets resulting in a spectrum of light appearing in the sky.",
                       },
                       class_type: "ShowText|pysssss",
                       _meta: {
                         title: "Show Text 🐍",
                       }
                     }
                   }
                   """;
        var apiPrompt = json.FromJson<Dictionary<string, ApiNode>>();
        apiPrompt.PrintDump();
    }

    [Test]
    public void Can_convert_flux_schnell_workflow()
    {
    }
}