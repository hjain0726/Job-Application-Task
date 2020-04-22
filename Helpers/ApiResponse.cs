using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Job_Application.Helpers
{
    public class ApiResponse : ApiError
    {
        public object msg { get; }

        public ApiResponse(object obj)
            : base(200, HttpStatusCode.OK.ToString())
        {
            this.msg = obj;
        }
    }
}
